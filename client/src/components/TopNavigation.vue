<!-- 
Fixed top menu 
Strapi collections:
    Menu - list menu items, type=main
-->
<template>
  <div class="is-fixed">
    <nav class="nav">
      <div class="tabs nav-right">
        <a
          v-for="menu in this.mainMenus"
          :key="menu.id"
          v-bind:href="menu.attributes.url"
        >
          {{ menu.attributes.title }}
        </a>
      </div>
    </nav>
  </div>
</template>
<script>
import { ApiGet } from "@/components/common/ApiAx.js";
export default {
  data() {
    return {
      mainMenus: [],
    };
  },
  async mounted() {
    let query = {
      filters: {
        type: {
          $eq: "main",
        },
      },
    };
    await ApiGet(`${this.apiUrl}/api/menus`, query)
      .then((data) => {
        //console.log(data);
        this.mainMenus = data.data;
      })
      .catch((error) => {
        //console.error(error);
        this.error = error;
      });
  },
};
</script>
<style>
.is-fixed {
  max-width: 90%;
  background-color: var(--bg-color);
  z-index: 100;
}
.nav {
  top: 0;
}
</style>