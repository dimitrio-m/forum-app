<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <VeeForm
        class="card card-form"
        @submit="register"
      >
        <h1 class="text-center">
          Register
        </h1>

        <AppFormField
          v-model="form.name"
          name="name"
          label="Name"
          rules="required"
        />
        <AppFormField
          v-model="form.username"
          name="username"
          label="Username"
          rules="required|unique:users,username"
        />
        <AppFormField
          v-model="form.email"
          name="email"
          label="Email"
          rules="required|email|unique:users,email"
          type="email"
        />
        <AppFormField
          v-model="form.password"
          name="password"
          label="Password"
          rules="required|min:8"
          type="password"
        />

        <div class="form-actions">
          <button
            type="submit"
            class="btn-blue btn-block"
          >
            Register
          </button>
        </div>
      </VeeForm>
      <div class="text-center push-top">
        <button
          class="btn-red btn-xsmall"
          @click="registerWithGoogle"
        >
          <i class="fa fa-google fa-btn" />Sign up with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  emits: ['ready'],
  data () {
    return {
      avatarPreview: null,
      form: {
        name: '',
        username: '',
        email: '',
        password: '',
        avatar: ''
      }
    }
  },
  created () {
    this.$emit('ready')
  },
  methods: {
    async register () {
      await this.$store.dispatch('auth/registerUserWithEmailAndPassword', this.form)
      this.$router.push('/')
    },
    async registerWithGoogle () {
      await this.$store.dispatch('auth/signInWithGoogle')
      this.$router.push('/')
    },
    handleImageUpload (e) {
      this.form.avatar = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        this.avatarPreview = event.target.result
      }
      reader.readAsDataURL(this.form.avatar)
    }
  }
}
</script>
