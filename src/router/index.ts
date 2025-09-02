import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/home/HomePage.vue'
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: HomePage },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})