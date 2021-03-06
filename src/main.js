import { createApp } from 'vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/app-check'
import App from './App.vue'
import Router from '@/router'
import Store from '@/store'
import firebaseConfig from '@/config/firebase'
import FontAwesome from '@/plugins/FontAwesome'
import ClickOutsideDirective from '@/plugins/ClickOutsideDirective'
import PageScrollDirective from '@/plugins/PageScrollDirective'
import Vue3Pagination from '@/plugins/Vue3Pagination'
import VeeValidatePlugin from '@/plugins/VeeValidatePlugin'
import { createHead } from '@vueuse/head'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(user => {
  Store.dispatch('auth/unsubscribeAuthUserSnapshot')
  if (user) {
    Store.dispatch('auth/fetchAuthUser')
  }
})
const appCheck = firebase.appCheck()
appCheck.activate('6LeyLYodAAAAAM69_alZ2q7xyTGUy1bKO-krdOz4', true)

const app = createApp(App)

app.use(Router)
app.use(Store)
app.use(FontAwesome)
app.use(ClickOutsideDirective)
app.use(PageScrollDirective)
app.use(Vue3Pagination)
app.use(VeeValidatePlugin)
app.use(createHead())

const requireComponent = require.context('./components', true, /App[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  )
  app.component(baseComponentName, baseComponentConfig)
})

app.mount('#app')
