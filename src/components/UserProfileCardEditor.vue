<template>
  <div class="profile-card">
    <form @submit.prevent="save">
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

      <div class="form-group">
        <input
          v-model="activeUser.username"
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold"
        >
      </div>

      <div class="form-group">
        <input
          v-model="activeUser.name"
          type="text"
          placeholder="Full Name"
          class="form-input text-lead"
        >
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          id="user_bio"
          v-model="activeUser.bio"
          class="form-input"
          placeholder="Write a few words about yourself."
        />
      </div>

      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>

      <hr>

      <div class="form-group">
        <label
          class="form-label"
          for="user_website"
        >Website</label>
        <input
          id="user_website"
          v-model="activeUser.website"
          autocomplete="off"
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label
          class="form-label"
          for="user_email"
        >Email</label>
        <input
          id="user_email"
          v-model="activeUser.email"
          autocomplete="off"
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label
          class="form-label"
          for="user_location"
        >Location</label>
        <input
          id="user_location"
          v-model="activeUser.location"
          autocomplete="off"
          class="form-input"
        >
      </div>

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
    </form>
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
      activeUser: { ...this.user }
    }
  },
  methods: {
    ...mapActions('users', ['updateUser']),
    ...mapActions('auth', ['uploadAvatar']),
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
