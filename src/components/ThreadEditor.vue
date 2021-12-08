<template>
  <VeeForm @submit="save">
    <AppFormField
      v-model="form.title"
      label="Title"
      name="title"
      rules="required"
    />
    <AppFormField
      v-model="form.text"
      as="textarea"
      label="Content"
      name="text"
      rules="required"
      rows="8"
      cols="140"
    />

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
        {{ existing ? 'Update' : 'Publish' }}
      </button>
    </div>
  </VeeForm>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  emits: ['cancel', 'save'],
  data () {
    return {
      form: {
        title: this.title,
        text: this.text
      }
    }
  },
  computed: {
    existing () {
      return !!this.title
    }
  },
  methods: {
    save () {
      this.$emit('save', { ...this.form })
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style>

</style>
