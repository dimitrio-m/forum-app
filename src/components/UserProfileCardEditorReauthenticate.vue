<template>
  <VueFinalModal
    v-model="showModal"
    classes="modal-container"
    content-class="modal"
  >
    <div class="modal-content">
      <h4>Login Again to Change Your Email</h4>
      <VeeForm @submit="reauthenticate">
        <AppFormField
          v-model="email"
          name="reauth-email"
          label="Email"
          rules="email"
        />
        <AppFormField
          v-model="password"
          name="reauth-password"
          label="Password"
          type="password"
        />
        <button class="btn btn-green btn-small">
          Login
        </button>
      </VeeForm>
    </div>
  </VueFinalModal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'

export default {
  components: { VueFinalModal },
  props: {
    modelValue: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'success', 'fail'],
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    showModal: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    async reauthenticate () {
      try {
        await this.$store.dispatch('auth/reauthenticate', { email: this.email, password: this.password })
        this.$emit('success')
      } catch (error) {
        this.$emit('fail', error)
      }
    }
  }
}
</script>
