import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/home/HomePage.vue'
import ChatBot from '@/views/chat/ChatBot.vue'
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: HomePage },
  {
    path: '/chatbot',
    name: 'ChatBot',
    component: ChatBot
  }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})