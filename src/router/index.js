import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import ThreadShow from '@/pages/ThreadShow.vue'
import ThreadCreate from '@/pages/ThreadCreate.vue'
import ThreadEdit from '@/pages/ThreadEdit.vue'
import ForumShow from '@/pages/ForumShow.vue'
import NotFound from '@/pages/NotFound.vue'
import Profile from '@/pages/Profile.vue'
import sourceData from '@/data.json'
import store from '@/store'

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/forum/:id',
    name: 'ForumShow',
    component: ForumShow,
    props: true,
    beforeEnter (to, from, next) {
      const forumExists = sourceData.forums.some(forum => forum.id === to.params.id)
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
    props: true
    /* beforeEnter (to, from, next) {
      const threadExists = sourceData.threads.some(thread => thread.id === to.params.id)
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
    } */
  },
  { path: '/forum/:forumId/thread/create', name: 'ThreadCreate', component: ThreadCreate, props: true },
  { path: '/thread/:id/edit', name: 'ThreadEdit', component: ThreadEdit, props: true },
  { path: '/me', name: 'Profile', component: Profile, meta: { toTop: true, smoothScroll: true } },
  { path: '/me/edit', name: 'ProfileEdit', component: Profile, props: { edit: true } },
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

router.beforeEach(() => {
  store.dispatch('unsubscribeAllSnapshots')
})

export default router
