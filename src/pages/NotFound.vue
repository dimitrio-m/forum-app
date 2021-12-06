<template>
  <div class="col-large text-center">
    <h1 class="title">
      Not Found
    </h1>
    <router-link :to="{ name: 'Home' }">
      Read some cool forums
    </router-link>
  </div>
</template>

<script>
export default {
  emits: ['ready'],
  created () {
    this.$emit('ready')
  }
}
</script>

<style>

</style>
