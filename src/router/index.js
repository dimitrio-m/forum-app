import {createRouter, createWebHistory} from 'vue-router'
import PageHome from '@/components/PageHome.vue'
import PageThreadShow from '@/components/PageThreadShow.vue'
import PageForumShow from '@/components/PageForumShow.vue'

const routes = [
  { path: '/', name: 'Home', component: PageHome },
  { path: '/forum/:id', name: 'ForumShow', component: PageForumShow, props: true },
  { path: '/thread/:id', name: 'ThreadShow', component: PageThreadShow, props: true },

]

export default createRouter({
  history: createWebHistory(),
  routes,
})
