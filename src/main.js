import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'

const app = createApp(App)

app.use(Router)

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
