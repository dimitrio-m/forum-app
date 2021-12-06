<template>
  <the-navbar />
  <div class="container">
    <router-view
      v-show="showPage"
      @ready="showPage = true"
    />
    <app-spinner
      v-show="!showPage"
    >
      loading...
    </app-spinner>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    TheNavbar
  },
  data () {
    return {
      showPage: false
    }
  },
  created () {
    this.fetchAuthUser()
    this.$router.beforeEach(() => {
      this.showPage = false
    })
  },
  methods: {
    ...mapActions(['fetchAuthUser'])
  }
}
</script>

<style>
@import "assets/style.css";
</style>
