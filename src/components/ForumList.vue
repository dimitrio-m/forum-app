<template>
  <div
    class="forum-list"
  >
    <h2 class="list-title">
      <a href="#"> {{ category.name }}</a>
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
        <p><span class="count">{{ forum.threads?.length || 0 }}</span> thread</p>
      </div>

      <div
        v-if="forum.threads"
        class="last-thread"
      >
        <img
          class="avatar"
          :src="userById(threadById(forum.threads[0]).userId).avatar"
          alt=""
        >
        <div class="last-thread-details">
          <a href="#">{{ threadById(forum.threads[0]).title }}</a>
          <p class="text-xsmall">
            By <a href="#">{{ userById(threadById(forum.threads[0]).userId).name }}</a>, <app-date :timestamp="threadById(forum.threads[0]).publishedAt" />
          </p>
        </div>
      </div>

      <div
        v-else
        class="last-thread"
      >
        No threads here
      </div>
    </div>
  </div>
</template>

<script>
import {threads, users} from '@/data.json'

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
  data() {
    return {
      threads,
      users,
    }
  },
  methods: {
    userById(userId) {
      return this.users.find(user => user.id === userId)
    },
    threadById(threadId) {
      return this.threads.find(thread => thread.id === threadId)
    },
  }
}
</script>

<style>

</style>
