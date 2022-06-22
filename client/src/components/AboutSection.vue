<!-- 
Brief information about the developer
Strapi collections:
    AboutPage - title and content
-->
<template>
  <section id="about">
    <div v-if="error" class="card text-error">
      {{ error }}
    </div>
    <div v-else>
      <h1>{{ aboutPage.title }}</h1>
      <VueShowdown :markdown="aboutPage.content" />
      <a
        class="button primary"
        v-bind:href="`${apiUrl}${profile.url}`"
        title="Download my resume" target="_blank"
        >Profile</a
      >
    </div>
  </section>
</template>
<script>
import { ApiGet } from "@/components/common/ApiAx.js";

export default {
  name: "App",
  data() {
    return {
      aboutPage: {},
      profile: {},
      error: null,
    };
  },
  async mounted() {
    let query = {
      populate: "*",
    };
    await ApiGet(`${this.apiUrl}/api/about-page`, query)
      .then((data) => {
        //console.log(data);
        this.aboutPage = data.data.attributes;
        this.profile = data.data.attributes.profile.data.attributes;
      })
      .catch((error) => {
        //console.error(error);
        this.error = error;
      });
  },
};
</script>
<style>
#about {
  padding-top: 25rem;
  min-height: 100vh;
}
</style>