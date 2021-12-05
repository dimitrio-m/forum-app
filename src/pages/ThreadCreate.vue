<template>
  <div class="col-full push-top">
    <h1>Create new thread in <i>{{ forum.name }}</i></h1>

    <form @submit.prevent="save">
      <div class="form-group">
        <label for="thread_title">Title:</label>
        <input
          id="thread_title"
          v-model="title"
          type="text"
          class="form-input"
          name="title"
        >
      </div>

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea
          id="thread_content"
          v-model="text"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
        />
      </div>

      <div class="btn-group">
        <button
          class="btn btn-ghost"
          @click.prevent="cancel"
        >
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
</template>

<script>
export default {
  props: {
    forumId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: '',
      text: ''
    }
  },
  computed: {
    forum () {
      return this.$store.state.forums.find(forum => forum.id === this.forumId)
    }
  },
  methods: {
    async save () {
      const newThread = await this.$store.dispatch('createThread', {
        forumId: this.forum.id,
        title: this.title,
        text: this.text
      })
      this.$router.push({ 'name': 'ThreadShow', params: { id: newThread.id } })
    },
    cancel () {
      this.$router.push({ name: 'ForumShow', params: { id: this.forum.id } })
    }
  }
}
</script>

<style>

</style>
