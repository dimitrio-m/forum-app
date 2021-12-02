<template>
  <div class="post-list">
    <div
      v-for="post in posts"
      :key="post.id"
      class="post"
    >
      <div class="user-info">
        <a
          href="profile.html#profile-details"
          class="user-name"
        >{{ userById(post.userId).name }}</a>

        <a href="profile.html#profile-details">
          <img
            class="avatar-large"
            :src="userById(post.userId).avatar"
            alt=""
          >
        </a>

        <p class="desktop-only text-small">
          {{ countPostsByUser(post.userId) }} posts
        </p>

        <p class="desktop-only text-small">
          {{ countThreadsByUser(post.userId) }} threads
        </p>

        <span class="online desktop-only">online</span>
      </div>

      <div class="post-content">
        <div>
          <p>
            {{ post.text }}
          </p>
        </div>
        <a
          href="#"
          style="margin-left: auto;"
          class="link-unstyled"
          title="Make a change"
        >
          <i class="fa fa-pencil" />
        </a>
      </div>



      <div class="post-date text-faded">
        {{ post.publishedAt }}
      </div>

      <!--  <div class="reactions">
        <ul>
          <li>💡</li>
          <li>❤️</li>
          <li>👎</li>
          <li>👍</li>
          <li>👌</li>
        </ul>
        <button class="btn-xsmall">
          <span class="emoji">❤️</span>️ 3
        </button>
        <button class="btn-xsmall active-reaction">
          <span class="emoji">👌️</span>️ 1
        </button>
        <button class="btn-xsmall">
          + <i class="fa fa-smile-o emoji" />
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import {threads, posts, users} from '@/data.json'

export default {
  props: {
    posts: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      source: {
        posts: posts,
        threads: threads,
        users: users
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
    },
    countPostsByUser(userId) {
      return this.source.posts.filter(post => post.userId === userId).length
    },
    countThreadsByUser(userId) {
      return this.source.threads.filter(thread => thread.userId === userId).length
    }
  }
}
</script>

<style>

</style>
