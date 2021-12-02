<template>
  <div class="col-large push-top">
    <!-- <ul class="breadcrumbs">
      <li><a href="#"><i class="fa fa-home fa-btn" />Home</a></li>
      <li><a href="category.html">Discussions</a></li>
      <li class="active">
        <a href="#">Cooking</a>
      </li>
    </ul> -->

    <h1>{{ thread.title }}</h1>

    <p>
      By <a
        href="#"
        class="link-unstyled"
      >{{ userById(thread.userId).name }}</a>, 2 hours ago.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >{{ thread.posts.length - 1 }} replies by {{ thread.contributors.length }} contributors</span>
    </p>

    <post-list :thread-posts="threadPosts" />
  </div>
</template>

<script>
import {threads, posts, users, forums, categories, stats} from '@/data.json'
import PostList from '@/components/PostList.vue'

export default {
  components: {
    PostList
  },
    props: {
      id: {
        type: String,
        required: true
      },
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
    computed: {
      thread() {
        return this.threadById(this.id)
      },
      threadPosts() {
        return this.posts.filter(post => post.threadId === this.id)
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
      },
      countPostsByUser(userId) {
        return this.posts.filter(post => post.userId === userId).length
      },
      countThreadsByUser(userId) {
        return this.threads.filter(thread => thread.userId === userId).length
      }
    }
}
</script>

<style>

</style>
