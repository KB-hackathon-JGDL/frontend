import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/home/HomePage.vue'
import ChatBot from '@/views/chat/ChatBot.vue'
import ReservationsView from '@/views/mentee/ReservationsView.vue'
import SessionCardView from '@/views/mentee/SessionCardView.vue'


const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: HomePage },
  {
    path: '/chatbot',
    name: 'ChatBot',
    component: ChatBot                           
  },
  {
  path: '/reservations',
  name: 'reservations',
  component: () => import('@/views/mentee/ReservationsView.vue'),
},
{
  path: '/reservations/:id/card',
  name: 'session-card',
  component: () => import('@/views/mentee/SessionCardView.vue'),
},
{
  path: '/mentee/chat/:sessionId',
  name: 'mentee-chat',
  component: () => import('@/views/mentee/ChatRoomView.vue'),
  props: route => ({
    sessionId: route.params.sessionId,
    readonly: route.query.readonly === '1',
  })
},
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})