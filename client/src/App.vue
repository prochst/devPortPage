<template>
  <div class="wrapper">
    <SideBar />
    <main class="main-content">
      <TopNavigation />
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <WorksSection/>
      <ContactSection/>
      <BlogSection/>
    </main>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import TopNavigation from "@/components/TopNavigation.vue";
import HomeSection from "@/components/HomeSection.vue";
import AboutSection from "@/components/AboutSection.vue";
import SkillsSection from "@/components/SkillsSection.vue";
import WorksSection from "@/components/WorksSection.vue";
import ContactSection from "@/components/ContactSection.vue";
import BlogSection from "@/components/BlogSection.vue";

export default {
  name: "App",
  components: {
    SideBar,
    TopNavigation,
    HomeSection,
    AboutSection,
    SkillsSection,
    WorksSection,
    ContactSection,
    BlogSection,
  },
  methods: {
    /**
     * navActivate - activate menu item according displayed page section 
     */
    navActivate: function () {
      // Collection menu section
      const sections = document.querySelectorAll("section[id]");
      // Current scroll position
      let scrollY = window.pageYOffset;
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop =
          current.getBoundingClientRect().top + window.pageYOffset - 100;
        let sectionId = current.getAttribute("id");
        // Test pozition of current section
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelector('.nav-right [href*="' + sectionId + '"]')
            .classList.add("active");
        } else {
          document
            .querySelector('.nav-right [href*="' + sectionId + '"]')
            .classList.remove("active");
        }
      } );
    },
  },

  created: function () {
    window.addEventListener("scroll", this.navActivate);
  },

  unmounted: function () {
    window.removeEventListener("scroll", this.navActivate);
  },
};
</script>

<style>
.wrapper {
  display: grid;
  grid-template-columns: fit-content(8rem) 1fr;
}
.main-content {
  min-height: calc(150vh);
}
section {
  text-align: left;
  padding-left: 5%;
  padding-right: 5%;
}
/* Scale side padding of main content */
@media screen and (min-width: 900px) {
  section {
    padding-left: 10%;
    padding-right: 15%;
  }
}
@media screen and (min-width: 1200px) {
  section {
    padding-left: 15%;
    padding-right: 20%;
  }
}
</style>
