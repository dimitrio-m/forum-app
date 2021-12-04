<template>
  <div class="col-full push-top">
    <h1>Create new post in <i>{{ title }}</i></h1>

    <form @submit.prevent="save">
      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea
          id="post_content"
          v-model="text"
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  emits: ['save'],
  data() {
    return {
      text: ''
    }
  },
  computed: {
    ...mapGetters(['authUser'])
  },
  methods: {
    save() {
      const post = {
        userId: this.authUser.id,
        publishedAt: Math.floor(Date.now()/1000),
        text: this.text
      }
      this.$emit('save', { post })
      this.text = ''
    }
  }
}
</script>

<style>

</style>
