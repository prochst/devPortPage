<!--
List of skills
Strapi collections: 
  SkillPage - title and general text
  Skill - list of skills grouped by types
  SkillType - list of skill types
-->
<template>
  <section id="skills">
    <div v-if="error" class="card">
      {{ error }}
    </div>
    <div v-else>
      <h1>{{ skillPage.title }}</h1>
      <VueShowdown :markdown="skillPage.content" />
      <div class="row">
        <div
          class="col-6 col-4-md card bg-light"
          v-for="type in types"
          :key="type"
        >
          <div class="row header">{{type.attributes.type}}</div>
          <div
            class="skill-row"
            v-for="skill in filterSkillsByType(type.attributes.type)"
            :key="skill.id"
          >
            <div class="skill">{{ skill.attributes.name }}</div>
            <div class="level">
              <span
                class="tag is-small text-white"
                :class="levelColor(skill.attributes.level)"
                >({{ skill.attributes.level }})</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ApiGet } from "@/components/common/ApiAx.js";

export default {
  data() {
    return {
      skillPage: {},
      skills: [],
      error: null,
      types: [],
    };
  },
  async mounted() {
    await ApiGet(`${this.apiUrl}/api/skill-page`)
      .then((data) => {
        //console.log(data);
        this.skillPage = data.data.attributes;
      })
      .catch((error) => {
        //console.error(error);
        this.error = error;
      });
    let query = {
      populate: '*',
    };  
    await ApiGet(`${this.apiUrl}/api/skills`, query)
      .then((data) => {
        //console.log(data);
        this.skills = data.data;
      })
      .catch((error) => {
        //console.error(error);
        this.error = error;
      });
    await ApiGet(`${this.apiUrl}/api/skill-types`)
      .then((data) => {
        //console.log(data);
        this.types = data.data;
      })
      .catch((error) => {
        //console.error(error);
        this.error = error;
      });
  },
  methods: {
    /**
     * filterSkillsByType - filter by skill type and ordered and colored according skill level
     * 
     * @param {string} skill type
     */
    filterSkillsByType(type) {
      return this.skills
        .filter((skill) => skill.attributes.skill_type.data.attributes.type == type)
        .sort((a, b) => b.attributes.level - a.attributes.level);
    },
    levelColor(level) {
      if (level > 60) {
        return "bg-success ";
      } else if (level <= 30) {
        return "bg-error";
      } else {
        return "bg-grey";
      }
    },
  },
};
</script>
<style>
#skills {
  padding-top: 8em;
  min-height: 100vh;
}
.skill-card {
  background: var(--bg-secondary-color);
}
.header {
  content: attr(data-header);
  font-size: 1.4em;
  font-weight: bold;
  padding-left: 0.3em;
}
.skill-row {
  display: grid;
  grid-template-columns: 1fr fit-content(8rem);
}
.skill {
  font-size: 0.9em;
  padding-left: 0.5em;
}

.level {
  font-size: 0.8em;
}
</style>