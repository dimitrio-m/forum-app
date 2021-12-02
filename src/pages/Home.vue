<template>
  <div class="col-full">
    <forum-list
      v-for="category in source.categories"
      :key="category.id"
      :category="category"
      :forums="source.forums.filter(f => f.categoryId === category.id)"
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
      source: {
        posts: posts,
        threads: threads,
        users: users,
        forums: forums,
        categories: categories,
        stats: stats,
      }
    }
  },
  methods: {
    userById(userId) {
      return this.source.users.find(user => user.id === userId)
    },
    postById(postId) {
      return this.source.posts.find(post => post.id === postId)
    },
    threadById(threadId) {
      return this.source.threads.find(thread => thread.id === threadId)
    }
  }
}
</script>

<style>

</style>
