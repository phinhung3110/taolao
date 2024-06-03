//index.js
import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Chat from '../components/Chat.vue'
import Profile from '../components/Profile.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Login },
    { path: '/signup', component: Signup },
    { path: '/chat', component: Chat },
    { path: '/profile', component: Profile }
   
 
  ]
})

export default router