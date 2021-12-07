<template>
  <div
    v-if="asyncDataStatus_ready"
    class="col-large push-top"
  >
    <!-- <ul class="breadcrumbs">
      <li><a href="#"><i class="fa fa-home fa-btn" />Home</a></li>
      <li><a href="category.html">Discussions</a></li>
      <li class="active">
        <a href="#">Cooking</a>
      </li>
    </ul> -->

    <h1>
      {{ thread.title }}
      <router-link
        v-if="thread.userId === authUser?.id"
        :to="{ name: 'ThreadEdit', params: { id: id } }"
        class="btn-green btn-small"
        tag="button"
      >
        Edit Thread
      </router-link>
    </h1>

    <p>
      By <a
        href="#"
        class="link-unstyled"
      >{{ thread.author?.name }}</a>, <app-date
        v-if="thread.publishedAt"
        :timestamp="thread.publishedAt"
      />.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >{{ thread.repliesCount }} replies by {{ thread.contributorsCount }} contributors</span>
    </p>

    <post-list :posts="threadPosts" />

    <post-editor
      v-if="authUser"
      @save="addPost"
    />
    <div
      v-else
      class="text-center"
      style="margin-bottom: 50px;"
    >
      <router-link :to="{name: 'SignIn', query:{redirectTo: $route.path}}">
        Sign In
      </router-link> or <router-link :to="{name: 'Register', query:{redirectTo: $route.path}}">
        Register
      </router-link> to reply.
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import difference from 'lodash/difference'
import PostEditor from '@/components/PostEditor.vue'
import PostList from '@/components/PostList.vue'
import useNotifications from '@/composables/useNotifications.js'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: {
    PostEditor,
    PostList
  },
  mixins: [asyncDataStatus],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup () {
    const { addNotification } = useNotifications()
    return { addNotification }
  },
  data () {
    return {
      newPostText: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['authUser']),
    thread () {
      return this.$store.getters['threads/thread'](this.id)
    },
    threads () {
      return this.$store.state.threads.items
    },
    posts () {
      return this.$store.state.posts.items
    },
    threadPosts () {
      return this.posts.filter(post => post.threadId === this.id).sort((a, b) => a.publishedAt - b.publishedAt)
    }
  },
  async created () {
    // fetch thread
    const thread = await this.fetchThread({
      id: this.id,
      onSnapshot: async ({ isLocal, item, previousItem }) => {
        if (!this.asyncDataStatus_ready || isLocal) return
        const newPosts = difference(item.posts, previousItem.posts)
        const hasNewPosts = newPosts.length > 0
        if (hasNewPosts) {
          await this.fetchPostsWithUsers(newPosts)
        } else {
          this.addNotification({ message: 'Thread recently updated' })
        }
      }
    })
    await this.fetchPostsWithUsers(thread.posts)
    this.asyncDataStatus_fetched()
  },
  methods: {
    ...mapActions('threads', ['fetchThread']),
    ...mapActions('posts', ['fetchPosts', 'createPost']),
    ...mapActions('users', ['fetchUsers', 'fetchUser']),
    async fetchPostsWithUsers (ids) {
      // fetch the posts
      const posts = await this.fetchPosts({
        ids,
        onSnapshot: ({ isLocal, previousItem }) => {
          if (!this.asyncDataStatus_ready || isLocal || (previousItem?.edited && !previousItem?.edited?.at)) return
          this.addNotification({ message: 'Thread recently updated' })
        }
      })
      // fetch the users associated with the posts
      const users = posts.map(post => post.userId).concat(this.thread.userId)
      const uniqueUsers = [...new Set(users)]
      await this.fetchUsers({ ids: uniqueUsers })
    },
    addPost (eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id
      }
      this.createPost(post)
    }
  }

}
</script>

<style>

</style>
