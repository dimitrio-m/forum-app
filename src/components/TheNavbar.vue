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
          <a @click="dropdown = !dropdown">
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
                v-for="link in dropdownLinks"
                :key="link.text"
                class="dropdown-menu-item"
              >
                <router-link
                  :to="{ name: link.page}"
                >
                  {{ link.text }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <ul>
        <li
          v-for="(link,i) in links"
          :key="i"
          class="navbar-item"
          :class="{ 'mobile-only': link.isMobileOnly }"
        >
          <router-link :to="{name: link.page}">
            {{ link.text }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      dropdown: false,
      mobileMenu: false,
      dropdownLinks: [
        {
          text: 'View profile',
          page: 'Profile'
        },
        {
          text: 'Log out',
          page: 'Home'
        },
      ],
      links: [
        {
          text: 'Home',
          page: 'Home'
        },
        {
          text: 'Category',
          page: 'Home'
        },
        {
          text: 'Forum',
          page: 'Home'
        },
        {
          text: 'Thread',
          page: 'Home'
        },
        {
          text: 'My Profile',
          page: 'Profile',
          isMobileOnly: true
        },
        {
          text: 'Logout',
          page: 'Home',
          isMobileOnly: true
        },
      ]
    }
  },
  computed: {
    ...mapGetters(['authUser'])
  }
}
</script>

<style>

</style>
