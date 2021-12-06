<template>
  <div class="col-full">
    <div
      v-if="forum"
      class="col-full push-top"
    >
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

    <thread-list :threads="threads" />

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
import { mapActions } from 'vuex'
import ThreadList from '@/components/ThreadList.vue'

export default {
  components: {
    ThreadList
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    forums () {
      return this.$store.state.forums
    },
    forum () {
      return findById(this.forums, this.id)
    },
    threads () {
      if (!this.forum || !this.forum.threads) return []
      return this.forum.threads.map(threadId => this.$store.getters.thread(threadId))
    }
  },
  async created () {
    // fetch forum
    const forum = await this.fetchForum({ id: this.id })
    if (forum.threads) {
      // fetch threads
      const threads = await this.fetchThreads({ ids: forum.threads })
      // fetch users
      const userIds = threads.map(thread => thread.userId)
      const uniqueUserIds = [...new Set(userIds)]
      this.fetchUsers({ ids: uniqueUserIds })
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'fetchThreads', 'fetchForum'])
  }
}
</script>

<style>

</style>
