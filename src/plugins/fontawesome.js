import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faPenToSquare, faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)
