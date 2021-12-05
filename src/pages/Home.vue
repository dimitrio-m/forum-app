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
  async beforeCreate () {
    // fetch categories
    const categories = await this.$store.dispatch('fetchAllCategories')
    // fetch forums
    const forumIds = categories.map(category => category.forums).flat()
    const forums = await this.$store.dispatch('fetchForums', { ids: forumIds })
    // fetch last posts
    const lastPostsIds = forums.map(forum => forum.lastPostId).filter(v => !!v) // remove undefined
    const posts = await this.$store.dispatch('fetchPosts', { ids: lastPostsIds })
    // fetch users
    const userIds = posts.map(post => post.userId)
    const uniqueUserIds = [...new Set(userIds)]
    this.$store.dispatch('fetchUsers', { ids: uniqueUserIds})
  },
}
</script>

<style>

</style>
