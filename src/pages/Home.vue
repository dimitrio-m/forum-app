<template>
  <div
    v-if="asyncDataStatus_ready"
    class="col-full"
  >
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
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: {
    ForumList
  },
  mixins: [asyncDataStatus],
  computed: {
    categories () {
      return this.$store.state.categories
    },
    forums () {
      return this.$store.state.forums
    }
  },
  async created () {
    // fetch categories
    const categories = await this.fetchAllCategories()
    // fetch forums
    const forumIds = categories.map(category => category.forums).flat()
    const forums = await this.fetchForums({ ids: forumIds })
    // fetch last posts
    const lastPostsIds = forums.map(forum => forum.lastPostId).filter(v => !!v) // remove undefined
    const posts = await this.fetchPosts({ ids: lastPostsIds })
    // fetch users
    const userIds = posts.map(post => post.userId)
    const uniqueUserIds = [...new Set(userIds)]
    await this.fetchUsers({ ids: uniqueUserIds })
    this.asyncDataStatus_fetched()
  },
  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums', 'fetchPosts', 'fetchUsers'])
  }
}
</script>

<style>

</style>
