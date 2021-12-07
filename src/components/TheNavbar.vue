<template>
  <header
    id="header"
    class="header"
  >
    <router-link
      :to="{ name: 'Home'}"
      class="logo"
    >
      <img src="/logo.png">
    </router-link>

    <div
      class="btn-hamburger"
      :class="{ 'btn-humburger-active': mobileMenu }"
      @click="mobileMenu = !mobileMenu"
    >
      <div class="top bar" />
      <div class="middle bar" />
      <div class="bottom bar" />
    </div>

    <nav
      class="navbar"
      :class="{ 'navbar-open': mobileMenu }"
    >
      <ul>
        <li
          v-if="authUser"
          class="navbar-user"
        >
          <a
            v-click-outside="() => dropdown = false"
            @click.prevent="dropdown = !dropdown"
          >
            <img
              class="avatar-small"
              :src="authUser.avatar"
              :alt="`${authUser.name} profile picture`"
            >
            <span>
              {{ authUser.name }}
              <img
                class="icon-profile"
                src="/arrow-profile.svg"
                alt=""
              >
            </span>
          </a>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div
            id="user-dropdown"
            :class="{ 'active-drop': dropdown }"
          >
            <div class="triangle-drop" />
            <ul class="dropdown-menu">
              <li
                class="dropdown-menu-item"
              >
                <router-link
                  :to="{ name: 'Profile' }"
                >
                  View Profile
                </router-link>
              </li>
              <li
                v-if="authUser"
                class="dropdown-menu-item"
              >
                <router-link :to="{ name: 'SignOut' }">
                  Sign Out
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <ul>
        <li class="navbar-item">
          <router-link :to="{name: 'Home'}">
            Home
          </router-link>
        </li>

        <li
          v-if="!authUser"
          class="navbar-item"
        >
          <router-link :to="{name: 'SignIn'}">
            Sign In
          </router-link>
        </li>
        <li
          v-if="!authUser"
          class="navbar-item"
        >
          <router-link :to="{name: 'Register'}">
            Register
          </router-link>
        </li>
        <li
          class="navbar-item mobile-only"
        >
          <router-link
            :to="{ name: 'Profile' }"
          >
            View Profile
          </router-link>
        </li>
        <li
          v-if="authUser"
          class="navbar-item mobile-only"
        >
          <router-link :to="{ name: 'SignOut' }">
            Sign Out
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dropdown: false,
      mobileMenu: false
    }
  },
  computed: {
    ...mapGetters('auth', ['authUser'])
  }
}
</script>

<style>

</style>
