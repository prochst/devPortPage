<!--
List of references to recent projects
Strapi collections: 
  WorkPage - title and general text
  Work - list of project
-->
<template>
  <section id="work">
    <div v-if="error" class="card text-error">
      {{ error }}
    </div>
    <div v-else>
      <h1>{{ workPage.title }}</h1>
      <VueShowdown :markdown="workPage.content" />
      <div class="work" v-for="work in works" :key="work.id">
        <div :class="['thumb', isOdd(work.id) ? 'thumb-odd' : 'thumb-even']">
          <a v-bind:href="work.attributes.url" target="_blank">
            <img
              class="thumb-img"
              v-bind:src="`${apiUrl}${work.attributes.thumbnail.data.attributes.url}`"
            />
          </a>
        </div>
        <div :class="['title', isOdd(work.id) ? 'title-odd' : 'title-even']">
          {{ work.attributes.title }}
        </div>
        <VueShowdown
          :markdown="work.attributes.description"
          :class="['desc', isOdd(work.id) ? 'desc-odd' : 'desc-even']"
        />
        <div :class="['skills', isOdd(work.id) ? 'skills-odd' : 'skills-even']">
          {{ work.attributes.skills }}
        </div>
        <div :class="['url-ref', isOdd(work.id) ? 'url-ref-odd' : 'url-ref-even']">
          <a
            v-bind:href="work.attributes.url"
            v-bind:title="work.attributes.title"
          >
            <svg class="icon">
              <use
                :xlink:href="`${iconpath}#ri-${work.attributes.icon}-fill`"
              ></use>
            </svg>
          </a>
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
      workPage: {},
      works: [],
      error: null,
      iconpath: require("@/assets/img/remixicon.symbol.svg"),
    };
  },
  async mounted() {
    await ApiGet(`${this.apiUrl}/api/work-page`)
      .then((data) => {
        //console.log(data);
        this.workPage = data.data.attributes;
      })
      .catch((error) => {
        //console.error(error);
        this.error = error;
      });
    let query = {
      populate: "*",
    };
    await ApiGet(`${this.apiUrl}/api/works`, query)
      .then((data) => {
        //console.log(data);
        this.works = data.data;
      })
      .catch((error) => {
        //console.error(error);
        this.error = error;
      });
  },
  methods: {
    isOdd(num) {
      //console.log(num%2 == 0);
      return num % 2 != 0;
    },
  },
};
</script>
<style>
#work {
  padding-top: 10rem;
  min-height: 150vh;
}
.work {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-bottom: 5rem;
}
.thumb {
  grid-column: 1 / 6;
  grid-row: 1 / spam 4;
  text-align: left;
  background-color: var(--bg-color);
  opacity: 0.3;
  z-index: 1;
}
.thumb:hover  {
  opacity: 1;
  z-index: 10;
}
.thumb-img {
  max-height: 300px;
}
.title {
  font-size: 1.6em;
  padding-top: 2rem;
  background-color: rgba(223, 228, 219, 0.6);
  
  z-index: 5;
}
.title-odd {
  grid-column: 2 / 6;
  grid-row: 1;
  text-align: right;
}
.title-even {
  grid-column: 1 / 5;
  grid-row: 1;
  text-align: left;
}
.desc {
  background-color: rgba(223, 228, 219, 0.7);
  z-index: 5;
}
.desc-odd {
  grid-column: 1 / 6;
  grid-row: 2;
  text-align: right;
}
.desc-even {
  grid-column: 1 / 6;
  grid-row: 2;
  text-align: left;
}
.skills {
  font-size: smaller;
  font-weight: bolder;
  font-family: monospace;
  color: var(--color-error);
  background-color: rgba(223, 228, 219, 0.6);
  z-index: 5;
}
.skills-odd {
  grid-column: 2 / 6;
  grid-row: 3;
  text-align: right;
}
.skills-even {
  grid-column: 1 / 5;
  grid-row: 3;
  text-align: left;
}
.url-ref {
  background-color: rgba(223, 228, 219, 0.6);
  z-index: 5;
}
.url-ref-odd {
  grid-column: 5 / 6;
  grid-row: 4;
  text-align: right;
}
.url-ref-even {
  grid-column: 1 / 2;
  grid-row: 4;
  text-align: left;
}
.icon {
  width: 1.5em;
  height: 1.5em;
  fill: var(--color-primary);
}

@media screen and (min-width: 900px) {
  .thumb-odd {
    grid-column: 1 / 4;
  }
  .thumb-even {
    grid-column: 3 / 6;
    text-align: right;
  }
  .thumb-img {
    height: 450px;
  }
  .title {
    padding-top: 4rem;
    font-size: 1.8em;
    background-color: transparent;
  }
  .title-odd {
    grid-column: 3 / 6;
  }
  .title-even {
    grid-column: 1 / 4;
  }
  .desc-odd {
    grid-column: 2 / 6;
  }
  .desc-even {
    grid-column: 1 / 5;
  }
  .skills {
    background-color: transparent;
  }
  .skills-odd {
    grid-column: 3 / 6;
  }
  .skills-even {
    grid-column: 1 / 3;
  }
  .url-ref-odd {
    grid-column: 5;
  }
  .url-ref-even {
    grid-column: 1;
  }
}
</style>