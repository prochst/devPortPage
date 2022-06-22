<!--
Simple blog app
Strapi collections: 
  Blog - list of blog articles
-->
<template>
  <section id="blog">
    <div v-if="error" class="card">
      {{ error }}
    </div>
    <div v-else>
      <div :class="['row', listView ? '' : 'is-hidden']">
        <div class="col-6 col-4-md card" v-for="blog in blogs" :key="blog.id">
          <div class="row header" @click="changeView(blog)">
            {{ blog.attributes.title }}
          </div>
          <div class="category">{{ blog.attributes.category }}</div>
          <hr class="line" />
          <img
              v-if="blog.attributes.image.data"
              class="thumb"
              v-bind:src="`${apiUrl}${blog.attributes.image.data.attributes.formats.thumbnail.url}`"
            />
          <div class="summary">{{ blog.attributes.summary }}</div>
        </div>
      </div>
      <div :class="['row', listView ? 'is-hidden' : '']">
        <div class="back col-12" @click="changeView(false)">
            <svg class="icon">
              <use
                :xlink:href="`${iconpath}#ri-arrow-go-back-line`"
              ></use>
            </svg> 
            Back to list
        </div>
        <div class="col-12 card">
            <div class="category">{{ selBlog.category }}</div>
            <div class="header">{{ selBlog.title }}</div>
            <hr class="line" />
            <img
              v-if="isBlogImage"
              class="image"
              v-bind:src="`${apiUrl}${selBlog.image.data.attributes.url}`"
            />
            <VueShowdown :markdown="selBlog.content" />
        </div>
        <div class="back col-12" @click="changeView(false)">
            <svg class="icon">
              <use
                :xlink:href="`${iconpath}#ri-arrow-go-back-line`"
              ></use>
            </svg>            
            Back to list
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
      iconpath: require("@/assets/img/remixicon.symbol.svg"),  
      blogs: [],
      selBlog: [],
      error: null,
      listView: true,
      isBlogImage: false,
    };
  },
  async mounted() {
    let query = {
      populate: "*",
    };
    await ApiGet(`${this.apiUrl}/api/blogs`, query)
      .then((data) => {
        //console.log(data);
        this.blogs = data.data;
      })
      .catch((error) => {
        //console.error(error);
        this.error = error;
      });
  },
  methods: {
    /**
     * changeView - changing visibility of blog list and current blog detail
     */
    changeView(blog) {
      //console.log(blog);
      if (blog) {
        this.selBlog = blog.attributes;
        this.isBlogImage = blog.attributes.image.data;       
      }
      this.listView = ! this.listView;
    },
  },
};
</script>
<style>
#blog {
  padding-top: 15em;
  min-height: 100vh;
  padding-left: 5%;
  padding-right: 5%;
}
.header {
  color: var(--color-primary);
  cursor:pointer;
}
.category {
  color: var(--color-error);
  font-size: smaller;
  font-family: monospace;
  font-weight: bolder;
}
.summary {
  text-align: justify;
}
.image {
    align-self: center;
    min-width: 75%;
}
.line {
  border-top: 3px solid var(--color-primary);
}
.back {
    font-size: smaller;
    color: var(--color-primary);
    cursor:pointer;
}
.icon {
  width: 1em;
  height: 1em;
}
</style>