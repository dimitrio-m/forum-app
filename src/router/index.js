import { createRouter, createWebHistory } from 'vue-router'
import { findById } from '@/helpers'
import Home from '@/pages/Home.vue'
import ThreadShow from '@/pages/ThreadShow.vue'
import ThreadCreate from '@/pages/ThreadCreate.vue'
import ThreadEdit from '@/pages/ThreadEdit.vue'
import ForumShow from '@/pages/ForumShow.vue'
import NotFound from '@/pages/NotFound.vue'
import Profile from '@/pages/Profile.vue'
import Register from '@/pages/Register'
import SignIn from '@/pages/SignIn'
import store from '@/store'

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/forum/:id',
    name: 'ForumShow',
    component: ForumShow,
    props: true,
    async beforeEnter (to, from, next) {
      await store.dispatch('forums/fetchForum', { id: to.params.id })
      const forumExists = findById(store.state.forums.items, to.params.id)
      if (forumExists) {
        next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    async beforeEnter (to, from, next) {
      await store.dispatch('threads/fetchThread', { id: to.params.id, once: true })
      const threadExists = findById(store.state.threads.items, to.params.id)
      if (threadExists) {
        next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    meta: { toTop: true, smoothScroll: true, requiresAuth: true }
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true, requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresGuest: true }
  },
  {
    path: '/logout',
    name: 'SignOut',
    async beforeEnter (to, from) {
      await store.dispatch('auth/signOut')
      return { name: 'Home' }
    }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})

router.beforeEach(async (to, from) => {
  await store.dispatch('auth/initAuthentication')
  console.log(`🚦 navigating to ${to.name} from ${from.name}`)
  store.dispatch('unsubscribeAllSnapshots')
  if (to.meta.requiresAuth && !store.state.auth.authId) {
    return { name: 'SignIn', query: { redirectTo: to.path } }
  }
  if (to.meta.requiresGuest && store.state.auth.authId) {
    return { name: 'Home' }
  }
})

export default router
