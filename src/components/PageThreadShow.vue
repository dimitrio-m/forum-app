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

    <div class="post-list">
      <div
        v-for="post in threadPosts"
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
          ><i class="fa fa-pencil" /></a>
        </div>



        <div class="post-date text-faded">
          6 hours ago
        </div>

        <div class="reactions">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {threads, posts, users, forums, categories, stats} from '@/data.json'

export default {
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
