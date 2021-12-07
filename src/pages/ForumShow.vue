<template>
  <div
    v-if="asyncDataStatus_ready"
    class="col-full"
  >
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

    <v-pagination
      v-model="page"
      :pages="totalPages"
      active-color="#57AD8D"
    />
  </div>
</template>

<script>
import { findById } from '@/helpers'
import { mapActions } from 'vuex'
import ThreadList from '@/components/ThreadList.vue'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: {
    ThreadList
  },
  mixins: [asyncDataStatus],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      page: parseInt(this.$route.query.page) || 1,
      perPage: 10
    }
  },
  computed: {
    forums () {
      return this.$store.state.forums.items
    },
    forum () {
      return findById(this.forums, this.id)
    },
    threads () {
      if (!this.forum || !this.forum.threads) return []
      return this.$store.state.threads.items
        .filter(thread => thread.forumId === this.forum.id)
        .map(thread => this.$store.getters['threads/thread'](thread.id))
    },
    threadCount () {
      return this.forum.threads.length
    },
    totalPages () {
      if (!this.threadCount) return 0
      return Math.ceil(this.threadCount / this.perPage)
    }
  },
  watch: {
    async page (page) {
      this.$router.push({ query: { page: this.page } })
    }
  },
  async created () {
    // fetch forum
    const forum = await this.fetchForum({ id: this.id })
    if (forum.threads) {
      // fetch threads
      const threads = await this.fetchThreadsByPage({ ids: forum.threads, page: this.page, perPage: this.perPage })
      // fetch users
      const userIds = threads.map(thread => thread.userId)
      const uniqueUserIds = [...new Set(userIds)]
      await this.fetchUsers({ ids: uniqueUserIds })
      this.asyncDataStatus_fetched()
    }
  },
  methods: {
    ...mapActions('users', ['fetchUsers']),
    ...mapActions('threads', ['fetchThreadsByPage']),
    ...mapActions('forums', ['fetchForum'])
  }
}
</script>

<style>

</style>
