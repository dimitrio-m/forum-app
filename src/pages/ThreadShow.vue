<template>
  <div class="col-large push-top">
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
      >{{ thread.author?.name }}</a>, <app-date :timestamp="thread.publishedAt" />.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >{{ thread.repliesCount }} replies by {{ thread.contributorsCount }} contributors</span>
    </p>

    <post-list :posts="threadPosts" />

    <post-editor
      :title="thread.title"
      @save="addPost"
    />
  </div>
</template>

<script>
import PostEditor from '@/components/PostEditor.vue'
import PostList from '@/components/PostList.vue'

export default {
  components: {
    PostEditor,
    PostList
  },
  props: {
    id: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      newPostText: ''
    }
  },
  computed: {
    thread() {
      return this.$store.getters.thread(this.id)
    },
    threadPosts() {
      return this.$store.state.posts.filter(post => post.threadId === this.id)
    }
  },
  async created () {
    // fetch thread
    const thread = await this.$store.dispatch('fetchThread', { id: this.id })
    // fetch the user
    this.$store.dispatch('fetchUser', { id: thread.userId })
    // fetch the posts
    const posts = await this.$store.dispatch('fetchPosts', { ids: thread.posts })
    const users = posts.map(post => post.userId)
    // fetch the user for each post
    this.$store.dispatch('fetchUsers', { ids: users })
  },
  methods: {
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id
      }
      this.$store.dispatch('createPost', post)
    }
  }
}
</script>

<style>

</style>
