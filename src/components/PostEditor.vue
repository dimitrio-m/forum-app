<template>
  <div class="col-full push-top">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          id="post_content"
          v-model="postCopy.text"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
        />
      </div>

      <div class="btn-group">
        <button
          class="btn btn-blue"
          type="submit"
          name="Publish"
        >
          {{ post.id? "Update Post" : "Submit Post" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => ({ text: null })
    }
  },
  emits: ['save'],
  data () {
    return {
      postCopy: { ...this.post }
    }
  },
  methods: {
    save () {
      this.$emit('save', { post: this.postCopy })
      this.postCopy.text = ''
    }
  }
}
</script>

<style>

</style>
