<!-- 
Aside fixed section with brand logo side menu with social links 
Strapi collections:
    Menu - list menu items, type=social
    HomePage - main logo
-->
<template>
  <aside class="sidebar">
    <div class="top">
      <a class="brand" href="#">
        <img v-bind:src="`${apiUrl}${logo.url}`">
      </a>
    </div>
    <div class="foot">
      <ul>
        <li v-for="menu in this.socialMenus" :key="menu.id">
          <a target="_blank"
            v-bind:href="menu.attributes.url"
            v-bind:title="menu.attributes.title"
          >
            <svg class="social-icon">
              <use
                :xlink:href="`${iconpath}#ri-${menu.attributes.icon}-line`"
              ></use>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script>
import { ApiGet } from "@/components/common/ApiAx.js";
export default {
  data() {
    return {
      socialMenus: [],
      logo: {},
      iconpath: require("@/assets/img/remixicon.symbol.svg"),
      error: null,
    };
  },
  async mounted() {
    let query = {
      filters: {
        type: {
          $eq: "social",
        },
      },
    };
    await ApiGet(`${this.apiUrl}/api/menus`, query)
      .then((data) => {
        //console.log(data);
        this.socialMenus = data.data;
      })
      .catch((error) => {
        //console.error(error);
        this.error = error;
      });
    query = {
      populate: '*',
    };
    await ApiGet(`${this.apiUrl}/api/home-page`, query)
      .then((data) => {
        //console.log(data);
        this.logo = data.data.attributes.logo.data.attributes;
      })
      .catch((error) => {
        //console.error(error);
        this.error = error;
      });
  },
};
</script>
<style>
.brand-logo {
  width: 3em;
  height: 3em;
  fill: var(--color-primary);
}
.social-icon {
  width: 1.5em;
  height: 1.5em;
  fill: var(--color-primary);
}
.sidebar {
  overflow: visible;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  height: 100vh;
  text-align: center;
  padding: 0.5rem 1.5rem;
}
.sidebar .top {
  margin-top: 1rem;
}
.sidebar .foot {
  margin-top: calc(100vh - 20rem);
}
.sidebar .foot ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>