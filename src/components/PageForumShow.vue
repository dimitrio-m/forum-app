<template>
  <div class="col-full">
    <div class="col-full push-top">
      <!-- <ul class="breadcrumbs">
        <li><a href="/index.html"><i class="fa fa-home fa-btn" />Home</a></li>
        <li><a href="/category.html">Discussions</a></li>
        <li class="active">
          <a href="#">Cooking</a>
        </li>
      </ul> -->

      <div class="forum-header">
        <div class="forum-details">
          <h1> {{ forum.name }} </h1>
          <p class="text-lead">
            {{ forum.description }}
          </p>
        </div>
        <a
          href="new-thread.html"
          class="btn-green btn-small"
        >Start a thread</a>
      </div>
    </div>

    <div class="col-full">
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
              <a href="thread.html">{{ thread.title }}</a>
            </p>
            <p class="text-faded text-xsmall">
              By <a href="profile.html"> {{ userById(thread.userId).name }} </a>, {{ thread.publishedAt }}.
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
                {{ getLastPostOfThread(thread).publishedAt }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="pagination">
        <button
          class="btn-circle"
          disabled
        >
          <i class="fa fa-angle-left" />
        </button>
        1 of 3
        <button class="btn-circle">
          <i class="fa fa-angle-right" />
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import {threads, posts, users, forums, categories, stats} from '@/data.json'

export default {
  components: {
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
    forum() {
      return this.forumById(this.id)
    },
    forumThreads() {
      return this.threads.filter(thread => thread.forumId === this.id)
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
    forumById(forumId) {
      return this.forums.find(forum => forum.id === forumId)
    },
    countPostsByUser(userId) {
      return this.posts.filter(post => post.userId === userId).length
    },
    countThreadsByUser(userId) {
      return this.threads.filter(thread => thread.userId === userId).length
    },
    getLastPostOfThread(thread) {
      return this.postById(thread.posts[thread.posts.length - 1])
    }
  }
}
</script>

<style>

</style>
