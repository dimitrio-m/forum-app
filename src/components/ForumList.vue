<template>
  <div
    v-if="users.length > 0 && posts.length > 0"
    class="forum-list"
  >
    <h2 class="list-title">
      {{ category.name }}
    </h2>
    <div
      v-for="forum in forums"
      :key="forum.id"
      class="forum-listing"
    >
      <div class="forum-details">
        <router-link
          class="text-xlarge"
          :to="{ name: 'ForumShow', params: { id: forum.id } }"
        >
          {{ forum.name }}
        </router-link>
        <p>{{ forum.description }}.</p>
      </div>

      <div class="threads-count">
        <p>
          <span class="count">{{ forum.threads?.length }}</span>
          {{ forumThreadsWord(forum) }}
        </p>
      </div>

      <div
        v-if="forum.threads"
        class="last-thread"
      >
        <img
          class="avatar"
          :src="userById(postById(forum.lastPostId).userId)?.avatar"
          alt=""
        >
        <div class="last-thread-details">
          <a href="#">{{ postById(forum.lastPostId).title }}</a>
          <p class="text-xsmall">
            By <a href="#">{{ userById(postById(forum.lastPostId).userId).name }}</a>, <app-date
              v-if="postById(forum.lastPostId).publishedAt"
              :timestamp="postById(forum.lastPostId).publishedAt"
            />
          </p>
        </div>
      </div>

      <div
        v-else
        class="last-thread"
      />
    </div>
  </div>
</template>

<script>
import { findById } from '@/helpers'

export default {
  props: {
    forums: {
      type: Array,
      required: true
    },
    category: {
      type: Object,
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
      return findById(this.users, userId) || {}
    },
    postById(postId) {
      return findById(this.posts, postId) || {}
    },
    forumThreadsWord (forum) {
      if (forum.threads?.length) {
        return forum.threads.length > 1 ? 'Threads' : 'Thread'
      } else {
        return 'No threads'
      }
    }
  }
}
</script>

<style>

</style>
