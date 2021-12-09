<template>
  <AppHead>
    <title>Vue.js 3 Demo Forum App by Dimitrios Mandamadiotis</title>
    <meta
      name="description"
      content="In this project I developed a forum app using Vue. This project serves as a demo of a real-world application, that’s optimized for performance and SEO, and covers all the essential topics for building a modern web application"
    >

    <!-- Social -->
    <meta
      property="og:title"
      content="Vue.js 3 Demo Forum App by Dimitrios Mandamadiotis"
    >
    <meta
      property="og:description"
      content="In this project I developed a forum app using Vue. This project serves as a demo of a real-world application, that’s optimized for performance and SEO, and covers all the essential topics for building a modern web application."
    >
    <meta
      property="og:image"
      content="/logo.png"
    >

    <!-- Twitter -->
    <meta
      name="twitter:title"
      content="Vue.js 3 Demo Forum App by Dimitrios Mandamadiotis"
    >
    <meta
      name="twitter:description"
      content="In this project I developed a forum app using Vue. This project serves as a demo of a real-world application, that’s optimized for performance and SEO, and covers all the essential topics for building a modern web application."
    >
    <meta
      name="twitter:image"
      content="/logo.png"
    >
    <meta
      name="twitter:card"
      content="summary_large_image"
    >
  </AppHead>
  <the-navbar />
  <div class="container">
    <router-view
      v-show="showPage"
      :key="$route.fullPath"
      @ready="onPageReady"
    />
    <app-spinner v-show="!showPage" />
    <app-notifications />
  </div>
  <the-footer />
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import { mapActions } from 'vuex'
import NProgress from 'nprogress'
export default {
  name: 'App',
  components: {
    TheNavbar,
    TheFooter
  },
  data () {
    return {
      showPage: false
    }
  },
  created () {
    this.fetchAuthUser()
    NProgress.configure({
      speed: 200,
      showSpinner: false
    })
    this.$router.beforeEach(() => {
      this.showPage = false
      NProgress.start()
    })
  },
  methods: {
    ...mapActions('auth', ['fetchAuthUser']),
    onPageReady () {
      this.showPage = true
      NProgress.done()
    }
  }
}
</script>

<style>
@import "assets/style.css";
@import "~nprogress/nprogress.css";
#nprogress .bar{
  background: #57AD8D !important;
}
</style>
