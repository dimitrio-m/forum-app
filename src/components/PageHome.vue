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
import {threads, posts, users, forums, categories, stats} from '@/data.json'
import ForumList from '@/components/ForumList.vue'

export default {
  components: {
    ForumList
  },
  data() {
    return {
      threads,
      posts,
      users,
      forums,
      categories,
      stats
    }
  },
  methods: {
    userById(userId) {
      return this.users.find(user => user.id === userId)
    },
    postById(postId) {
      return this.posts.find(post => post.id === postId)
    },
    threadById(threadId) {
      return this.threads.find(thread => thread.id === threadId)
    }
  }
}
</script>

<style>

</style>
