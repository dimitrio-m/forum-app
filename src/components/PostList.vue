<template>
  <div
    v-if="users"
    class="post-list"
  >
    <div
      v-for="post in posts"
      :key="post.id"
      class="post"
    >
      <div
        v-if="userById(post.userId)"
        class="user-info"
      >
        <a
          href="profile.html#profile-details"
          class="user-name"
        >{{ userById(post.userId).name }}</a>

        <a href="profile.html#profile-details">
          <img
            class="avatar-large"
            :src="userById(post.userId).avatar"
            alt=""
          >
        </a>

        <p class="desktop-only text-small">
          {{ userById(post.userId).postsCount }} posts
        </p>

        <p class="desktop-only text-small">
          {{ userById(post.userId).threadsCount }} threads
        </p>

        <span class="online desktop-only">online</span>
      </div>

      <div class="post-content">
        <div class="col-full">
          <post-editor
            v-if="editing === post.id"
            :post="post"
            @save="handleUpdate"
          >
            Editor mode
          </post-editor>
          <p v-else>
            {{ post.text }}
          </p>
        </div>
        <a
          v-if="post.userId === $store.state.authId"
          href="#"
          style="margin-left: auto; padding-left:10px;"
          class="link-unstyled"
          title="Make a change"
          @click.prevent="toggleEditMode(post.id)"
        >
          <fa icon="pencil-alt" />
        </a>
      </div>

      <div class="post-date text-faded">
        <div
          v-if="post.edited?.at"
          class="edition-info"
        >
          edited
        </div>
        <app-date :timestamp="post.publishedAt" />
      </div>

      <!--  <div class="reactions">
        <ul>
          <li>💡</li>
          <li>❤️</li>
          <li>👎</li>
          <li>👍</li>
          <li>👌</li>
        </ul>
        <button class="btn-xsmall">
          <span class="emoji">❤️</span>️ 3
        </button>
        <button class="btn-xsmall active-reaction">
          <span class="emoji">👌️</span>️ 1
        </button>
        <button class="btn-xsmall">
          + <i class="fa fa-smile-o emoji" />
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import PostEditor from '@/components/PostEditor.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    PostEditor
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      editing: null
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    }
  },
  methods: {
    ...mapActions(['updatePost']),
    userById (userId) {
      return this.$store.getters.user(userId)
    },
    toggleEditMode (id) {
      this.editing = id === this.editing ? null : id
    },
    handleUpdate (event) {
      this.updatePost(event.post)
      this.editing = null
    }
  }
}
</script>

<style>

</style>
