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
      >{{ userById(thread.userId).name }}</a>, <app-date :timestamp="thread.publishedAt" />.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >{{ thread.posts.length - 1 }} replies by {{ thread.contributors?.length || 0 }} contributors</span>
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
    threads() {
      return this.$store.state.threads
    },
    posts() {
      return this.$store.state.posts
    },
    users() {
      return this.$store.state.users
    },
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
    threadById(threadId) {
      return this.threads.find(thread => thread.id === threadId)
    },
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
