<template>
  <img :src="src || '/user-placeholder.png'">
</template>

<script>
export default {
  props: {
    src: { type: String, default: '/user-placeholder.png' }
  }
}
</script>

<style scoped>
  img{
    object-fit: cover;
  }
</style>
