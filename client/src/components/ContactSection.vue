<!-- 
Contact information
Strapi collections:
    COntactPage - title, content, eamil button
-->
<template>
  <section id="contact">
    <div v-if="error" class="card text-error">
      {{ error }}
    </div>
    <div v-else>
      <h1>{{ contactPage.title }}</h1>
      <VueShowdown :markdown="contactPage.content" />
      <a
        class="button primary"
        v-bind:href="`${contactPage.email_url}`"
        :title="contactPage.email_title" target="_blank"
        >{{contactPage.email_title}}</a
      >
    </div>
  </section>
</template>
<script>
import { ApiGet } from "@/components/common/ApiAx.js";

export default{
  data() {
    return {
      contactPage: {},
      error: null,
    };
  },
  async mounted() {
    await ApiGet(`${this.apiUrl}/api/contact-page`)
      .then((data) => {
        //console.log(data);
        this.contactPage = data.data.attributes;
      })
      .catch((error) => {
        //console.error(error);
        this.error = error;
      });
  },
}
</script>
<style>
#contact {
  padding-top: 25rem;
  min-height: 100vh;
}
</style>