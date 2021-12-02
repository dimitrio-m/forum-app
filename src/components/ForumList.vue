<template>
  <div
    v-for="forum in forums"
    :key="forum.id"
    class="forum-listing"
  >
    <div class="forum-details">
      <a
        class="text-xlarge"
        href="forum.html"
      >{{ forum.name }}</a>
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
          By <a href="#">{{ userById(threadById(forum.threads[0]).userId).name }}</a>, a month ago
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
</template>

<script>
import {threads, users} from '@/data.json'

export default {
  props: {
    forums: {
      type: Array,
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
    }
  }
}
</script>

<style>

</style>
