import {createRouter, createWebHistory} from 'vue-router'
import PageHome from '@/components/PageHome.vue'
import PageThreadShow from '@/components/PageThreadShow.vue'
import PageForumShow from '@/components/PageForumShow.vue'
import PageNotFound from '@/components/PageNotFound.vue'
import sourceData from '@/data.json'

const routes = [
  { path: '/', name: 'Home', component: PageHome },
  { path: '/forum/:id', name: 'ForumShow', component: PageForumShow, props: true },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: PageThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      const threadExists = sourceData.threads.some(thread => thread.id === to.params.id)
      if (threadExists) {
        next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash,
        })
      }
    }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: PageNotFound },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
