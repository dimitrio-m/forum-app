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
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

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
  created () {
    // Fetch thread
    firebase.firestore().collection('threads').doc(this.id).onSnapshot( doc => {
      const thread = { ...doc.data(), id: doc.id }
      this.$store.commit('setThread', { thread })

      // Fetch user
      firebase.firestore().collection('users').doc(thread.userId).onSnapshot( doc => {
        const user = { ...doc.data(), id: doc.id }
        this.$store.commit('setUser', { user })
      })

      // Fetch posts
      thread.posts.forEach(postId => {
        firebase.firestore().collection('posts').doc(postId).onSnapshot( doc => {
          const post = { ...doc.data(), id: doc.id }
          this.$store.commit('setPost', { post })

          // Fetch user for each post
          firebase.firestore().collection('users').doc(post.userId).onSnapshot( doc => {
            const user = { ...doc.data(), id: doc.id }
            this.$store.commit('setUser', { user })
          })
        })
      });
    })
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
