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
    <UserProfileCardEditorReauthenticate
      v-model="needsReAuth"
      @success="onReauthenticated"
      @fail="onReauthenticatedFailed"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserProfileCardEditorReauthenticate from '@/components/UserProfileCardEditorReauthenticate.vue'
import useNotifications from '@/composables/useNotifications'

export default {
  components: {
    UserProfileCardEditorReauthenticate
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup () {
    const { addNotification } = useNotifications()
    return { addNotification }
  },
  data () {
    return {
      uploadingImage: false,
      activeUser: { ...this.user },
      locationOptions: [],
      needsReAuth: false
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
    async onReauthenticated () {
      await this.$store.dispatch('auth/updateEmail', { email: this.activeUser.email })
      this.saveUserData()
    },
    async onReauthenticatedFailed () {
      this.addNotification({ message: 'Error updating user', type: 'error', timeout: 3000 })
      this.$router.push({ name: 'Profile' })
    },
    async saveUserData () {
      await this.$store.dispatch('users/updateUser', { ...this.activeUser, threads: this.activeUser.threadIds })
      this.$router.push({ name: 'Profile' })
      this.addNotification({ message: 'User successfully updated', timeout: 3000 })
    },
    async save () {
      const emailChanged = this.activeUser.email !== this.user.email
      if (emailChanged) {
        this.needsReAuth = true
      } else {
        this.saveUserData()
      }
    },
    cancel () {
      this.$router.push({ name: 'Profile' })
    }
  }
}
</script>

<style>

</style>
