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
        <li class="navbar-user">
          <a @click="dropdown = !dropdown">
            <img
              class="avatar-small"
              src="https://pbs.twimg.com/profile_images/1188775562657091594/5mgkg44t_400x400.jpg"
              alt=""
            >
            <span>
              Alex Kyriakidis
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
export default {
  data() {
    return {
      dropdown: false,
      mobileMenu: false,
      dropdownLinks: [
        {
          text: 'View profile',
          page: 'Home'
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
          page: 'Home',
          isMobileOnly: true
        },
        {
          text: 'Logout',
          page: 'Home',
          isMobileOnly: true
        },
      ]
    }
  }
}
</script>

<style>

</style>
