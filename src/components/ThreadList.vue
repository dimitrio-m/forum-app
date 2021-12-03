<template>
  <div class="thread-list">
    <h2 class="list-title">
      Threads
    </h2>
    <div
      v-for="thread in forumThreads"
      :key="thread.id"
      class="thread"
    >
      <div>
        <p>
          <router-link :to="{ name: 'ThreadShow', params: { id: thread.id }}">
            {{ thread.title }}
          </router-link>
        </p>
        <p class="text-faded text-xsmall">
          By <a href="profile.html"> {{ userById(thread.userId).name }} </a>, <app-date :timestamp="thread.publishedAt" />.
        </p>
      </div>

      <div class="activity">
        <p class="replies-count">
          {{ thread.posts.length - 1 }} reply
        </p>
        <img
          class="avatar-medium"
          :src="userById(getLastPostOfThread(thread).userId).avatar"
          alt=""
        >
        <div>
          <p class="text-xsmall">
            <a href="profile.html">{{ userById(getLastPostOfThread(thread).userId).name }}</a>
          </p>
          <p class="text-xsmall text-faded">
            <app-date :timestamp="getLastPostOfThread(thread).publishedAt" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forumThreads: {
      type: Array,
      required: true
    }
  },
  computed: {
    posts() {
      return this.$store.state.posts
    },
    users() {
      return this.$store.state.users
    },
  },
  methods: {
    userById(userId) {
      return this.users.find(user => user.id === userId)
    },
    postById(postId) {
      return this.posts.find(post => post.id === postId)
    },
    getLastPostOfThread(thread) {
      return this.postById(thread.posts[thread.posts.length - 1])
    }
  }
}
</script>

<style>

</style>
