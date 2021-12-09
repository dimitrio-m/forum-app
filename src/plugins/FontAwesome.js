import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faCamera } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPencilAlt, faCamera, faGithub)

export default (app) => {
  app.component('Fa', FontAwesomeIcon)
}
