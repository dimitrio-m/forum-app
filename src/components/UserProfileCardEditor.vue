<template>
  <div class="profile-card">
    <VeeForm @submit="save">
      <p class="text-center avatar-edit">
        <label for="avatar">
          <app-avatar-img
            :src="activeUser.avatar"
            :alt="`${activeUser.name} profile picture`"
            class="avatar-xlarge img-update"
          />
          <div class="avatar-upload-overlay">
            <AppSpinner
              v-if="uploadingImage"
              color="white"
            />
            <fa
              v-else
              icon="camera"
              size="3x"
              :style="{color: 'white', opacity: '8'}"
            />
          </div>
          <input
            v-show="false"
            id="avatar"
            type="file"
            accept="image/*"
            @change="handleAvatarUpload"
          >
        </label>
      </p>

      <AppFormField
        v-model="activeUser.username"
        label="Username"
        name="username"
        :rules="`required|unique:users,username,${user.username}`"
      />
      <AppFormField
        v-model="activeUser.name"
        label="Full Name"
        name="name"
        rules="required"
      />
      <AppFormField
        v-model="activeUser.bio"
        label="Bio"
        name="bio"
        as="textarea"
        placeholder="Write a few words about yourself."
      />

      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>

      <hr>

      <AppFormField
        v-model="activeUser.website"
        label="Website"
        name="website"
        rules="url"
      />
      <AppFormField
        v-model="activeUser.email"
        label="Email"
        name="email"
        :rules="`required|email|unique:users,email,${user.email}`"
      />
      <AppFormField
        v-model="activeUser.location"
        label="Location"
        name="location"
        list="locations"
        @mouseenter="loadLocationOptions"
      />
      <datalist id="locations">
        <option
          v-for="location in locationOptions"
          :key="location.name.common"
          :value="location.name.common"
        />
      </datalist>

      <div class="btn-group space-between">
        <button
          class="btn-ghost"
          @click.prevent="cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn-blue"
        >
          Save
        </button>
      </div>
    </VeeForm>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppAvatarImg from './AppAvatarImg.vue'

export default {
  components: { AppAvatarImg },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      uploadingImage: false,
      activeUser: { ...this.user },
      locationOptions: []
    }
  },
  methods: {
    ...mapActions('users', ['updateUser']),
    ...mapActions('auth', ['uploadAvatar']),
    async loadLocationOptions () {
      if (this.locationOptions.length) return
      const res = await fetch('https://restcountries.com/v3/all')
      this.locationOptions = await res.json()
    },
    async handleAvatarUpload (e) {
      this.uploadingImage = true
      const file = e.target.files[0]
      const uploadedImage = await this.uploadAvatar({ file })
      this.activeUser.avatar = uploadedImage || this.activeUser.avatar
      this.uploadingImage = false
    },
    save () {
      this.updateUser(this.activeUser)
      this.$router.push({ name: 'Profile' })
    },
    cancel () {
      this.$router.push({ name: 'Profile' })
    }
  }
}
</script>

<style>

</style>
