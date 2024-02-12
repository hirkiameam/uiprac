import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch, fas } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

// regular/blandsを使いたい場合は別途インストールする
library.add(faSearch)
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})
