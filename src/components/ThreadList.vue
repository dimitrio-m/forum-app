<template>
  <div
    v-if="users.length > 0 || threads.length === 0"
    class="thread-list"
  >
    <h2 class="list-title">
      Threads
    </h2>
    <div
      v-for="thread in threads"
      :key="thread.id"
      class="thread"
    >
      <div>
        <p>
          <router-link
            v-if="thread.id"
            :to="{ name: 'ThreadShow', params: { id: thread.id }}"
          >
            {{ thread.title }}
          </router-link>
        </p>
        <p class="text-faded text-xsmall">
          By <a href="profile.html"> {{ thread.author?.name }} </a>, <app-date
            v-if="thread.publishedAt"
            :timestamp="thread.publishedAt"
          />.
        </p>
      </div>

      <div class="activity">
        <p class="replies-count">
          {{ thread.repliesCount }} reply
        </p>
        <img
          class="avatar-medium"
          :src="userById(thread.userId).avatar"
          alt=""
        >
        <div>
          <p class="text-xsmall">
            <a href="profile.html">{{ userById(thread.userId).name }}</a>
          </p>
          <p class="text-xsmall text-faded">
            <app-date
              v-if="thread.publishedAt"
              :timestamp="thread.publishedAt"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findById } from '@/helpers'

export default {
  props: {
    threads: {
      type: Array,
      required: true
    }
  },
  computed: {
    posts () {
      return this.$store.state.posts
    },
    users () {
      return this.$store.state.users
    }
  },
  methods: {
    userById (userId) {
      return findById(this.users, userId) || {}
    },
    postById (postId) {
      return findById(this.posts, postId) || {}
    },
    getLastPostOfThread (thread) {
      return this.postById(thread.posts[thread.posts.length - 1])
    }
  }
}
</script>

<style>

</style>
