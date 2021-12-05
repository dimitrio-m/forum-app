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
      :title="thread.title"
      @save="addPost"
    />
  </div>
</template>

<script>
import PostEditor from '@/components/PostEditor.vue'
import PostList from '@/components/PostList.vue'
import { mapActions } from 'vuex'

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
      return this.$store.state.posts.filter(post => post.threadId === this.id).sort((a,b) => a.publishedAt - b.publishedAt)
    }
  },
  async created () {
    // fetch thread
    const thread = await this.fetchThread({ id: this.id })
    // fetch the posts
    const posts = await this.fetchPosts({ ids: thread.posts })
    // fetch the user for each post and thread user
    const userIds = posts.map(post => post.userId).concat(thread.userId)
    const uniqueUserIds = [...new Set(userIds)]
    this.fetchUsers({ ids: uniqueUserIds})
  },
  methods: {
    ...mapActions(['fetchThread', 'fetchPosts', 'fetchUsers', 'fetchUser', 'createPost']),
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id
      }
      this.createPost(post)
    }
  },

}
</script>

<style>

</style>
