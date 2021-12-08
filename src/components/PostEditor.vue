<template>
  <div class="col-full push-top">
    <VeeForm
      :key="formKey"
      @submit="save"
    >
      <AppFormField
        v-model="postCopy.text"
        as="textarea"
        name="text"
        rows="10"
        cols="30"
        rules="required"
      />

      <div class="btn-group">
        <button
          class="btn btn-blue"
          type="submit"
          name="Publish"
        >
          {{ post.id? "Update Post" : "Submit Post" }}
        </button>
      </div>
    </VeeForm>
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
      postCopy: { ...this.post },
      formKey: Math.random()
    }
  },
  methods: {
    save () {
      this.$emit('save', { post: this.postCopy })
      this.postCopy.text = ''
      this.formKey = Math.random()
    }
  }
}
</script>

<style>

</style>
