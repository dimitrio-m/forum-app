import { createApp } from 'vue'
import firebase from 'firebase/compat/app'
import App from './App.vue'
import Router from '@/router'
import Store from '@/store'
import firebaseConfig from '@/config/firebase'
import FontAwesome from '@/plugins/FontAwesome'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const app = createApp(App)

app.use(Router)
app.use(Store)
app.use(FontAwesome)

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
