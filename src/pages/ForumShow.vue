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
        <router-link
          :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
          class="btn-green btn-small"
        >
          Start a thread
        </router-link>
      </div>
    </div>

    <thread-list :forum-threads="forumThreads" />

    <!-- <div class="col-full">
      <div class="pagination">
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
      </div>
    </div> -->
  </div>
</template>

<script>
import { findById } from '@/helpers'
import ThreadList from '@/components/ThreadList.vue';

export default {
  components: {
    ThreadList
  },
  props: {
    id: {
      type: String,
      required: true
    },
  },
  computed: {
    threads() {
      return this.$store.state.threads
    },
    forums() {
      return this.$store.state.forums
    },
    forum() {
      return this.forumById(this.id)
    },
    forumThreads() {
      return this.threads.filter(thread => thread.forumId === this.id)
    }
  },
  methods: {
    forumById(forumId) {
      return findById(this.forums, forumId)
    },
  }
}
</script>

<style>

</style>
