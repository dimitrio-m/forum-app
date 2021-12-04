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

    <div class="col-full push-top">
      <h1>Create new post in <i>{{ thread.title }}</i></h1>

      <form @submit.prevent="addPost">
        <div class="form-group">
          <label for="thread_content">Content:</label>
          <textarea
            id="post_content"
            v-model="newPostText"
            class="form-input"
            name="content"
            rows="8"
            cols="140"
          />
        </div>

        <div class="btn-group">
          <button class="btn btn-ghost">
            Cancel
          </button>
          <button
            class="btn btn-blue"
            type="submit"
            name="Publish"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'

export default {
  components: {
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
    addPost() {
      const post = {
        threadId: this.id,
        userId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2',
        publishedAt: Math.floor(Date.now()/1000),
        text: this.newPostText
      }
      this.$store.dispatch('createPost', post)
      this.newPostText = ''
    }
  }
}
</script>

<style>

</style>
