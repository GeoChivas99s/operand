import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { auth } from '@/config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Vuelidate from 'vuelidate'
import './plugins/fontawesome'

Vue.use(Vuelidate)

Vue.config.productionTip = false

let app

onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
