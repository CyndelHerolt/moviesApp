import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouseHeart } from '@fortawesome/pro-light-svg-icons'
import { faFilm } from '@fortawesome/pro-light-svg-icons'
import { faUsers } from '@fortawesome/pro-light-svg-icons'
import { faListTimeline } from '@fortawesome/pro-light-svg-icons'
import { faUser } from '@fortawesome/pro-light-svg-icons'
import { faUserLargeSlash } from '@fortawesome/pro-light-svg-icons'
import { faPenToSquare } from '@fortawesome/pro-light-svg-icons'

app.use(router)

library.add(faHouseHeart)
library.add(faFilm)
library.add(faUsers)
library.add(faListTimeline)
library.add(faUser)
library.add(faUserLargeSlash)
library.add(faPenToSquare)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
