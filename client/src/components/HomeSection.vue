<!-- 
Home page section
Strapi collections:
    HomePage - title, content, button
-->
<template>
    <section class="home">
      <p class="greeting">{{ homePage.greeting }}</p>
      <p class="home-title">{{ homePage.title }}</p>
      <p class="home-text">{{ homePage.text }}</p>
      <a class="button primary" v-bind:href="homePage.url">{{ homePage.url_title }}</a>
      <div v-if="error" class="card text-error">
        {{ error }}
      </div>
    </section>
</template>
<script>
import { ApiGet } from "@/components/common/ApiAx.js";
export default {
  data() {
    return {
      homePage: {},
      error: null,
    };
  },
  async mounted() {
    await ApiGet(`${this.apiUrl}/api/home-page`)
      .then((data) => {
        //console.log(data);
        this.homePage = data.data.attributes;
      })
      .catch((error) => {
        //console.error(error);
        this.error = error;
      });
  },
};
</script>
<style>
.greeting {
    color: var(--text-grey);
    font-size: 2em;
    margin: 0;
}
.home-title {
    color: var(--text-primary);
    font-size: 5em;
    margin: 0;
}
.home-text {
    color: var(--text-dark);
    font-size: 1.5em;
}
.home {
    margin-top: calc(30vh);
    min-height: 100vh;
}
</style>