<template>
  <div class="col-full">
    <forum-list
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :forums="forums.filter(f => f.categoryId === category.id)"
    />
  </div>
</template>

<script>
import ForumList from '@/components/ForumList.vue'

export default {
  components: {
    ForumList
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
    forums() {
      return this.$store.state.forums
    }
  },
}
</script>

<style>

</style>
