<template>
  <div
    v-if="forum"
    class="col-full push-top"
  >
    <h1>Create new thread in <i>{{ forum.name }}</i></h1>
    <thread-editor
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { findById } from '@/helpers'
import ThreadEditor from '@/components/ThreadEditor.vue'

export default {
  components: {
    ThreadEditor
  },
  props: {
    forumId: {
      type: String,
      required: true
    }
  },
  computed: {
    forum () {
      return findById(this.$store.state.forums, this.forumId)
    }
  },
  created () {
    if (this.forum) return
    this.fetchForum({ id: this.forumId })
  },
  methods: {
    ...mapActions(['createThread', 'fetchForum']),
    async save ({ title, text }) {
      const newThread = await this.createThread({
        forumId: this.forum.id,
        title,
        text
      })
      this.$router.push({ name: 'ThreadShow', params: { id: newThread.id } })
    },
    cancel () {
      this.$router.push({ name: 'ForumShow', params: { id: this.forum.id } })
    }
  }
}
</script>

<style>

</style>
