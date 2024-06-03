//main.js


import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './assets/styles.css'




library.add(faPencilAlt)

import {createBootstrap} from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

createApp(App)
    .use(router)
    .use(createBootstrap())
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
