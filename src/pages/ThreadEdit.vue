<template>
  <div
    v-if="thread && text"
    class="col-full push-top"
  >
    <h1>Editing <i>{{ thread.name }}</i></h1>
    <thread-editor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { findById } from '@/helpers'
import ThreadEditor from '@/components/ThreadEditor.vue'

export default {
  components: {
    ThreadEditor
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    thread () {
      return findById(this.$store.state.threads, this.id)
    },
    text () {
      const post = findById(this.$store.state.posts, this.thread.posts[0])
      return post ? post.text : ''
    }
  },
  async created() {
    if (this.thread && this.text) return
    const thread = await this.$store.dispatch('fetchThread', { id: this.id })
    this.$store.dispatch('fetchPost', { id: thread.posts[0] })
  },
  methods: {
    async save ({ title, text }) {
      const newThread = await this.$store.dispatch('updateThread', {
        id: this.id,
        title,
        text
      })
      this.$router.push({ 'name': 'ThreadShow', params: { id: newThread.id } })
    },
    cancel () {
      this.$router.push({ 'name': 'ThreadShow', params: { id: this.id } })
    }
  }
}
</script>

<style>

</style>
