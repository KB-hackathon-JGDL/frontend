import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/home/HomePage.vue'
import ChatBot from '@/views/chat/ChatBot.vue'
import MentorDetailPage from '@/views/mentor/MentorDetailPage.vue'
import ReservePage from '@/views/mentor/ReservePage.vue'
import ConsultationCard from '@/views/mentor/ConsultationCard.vue'
import ReviewKeywordsView from '@/views/mentee/ReviewKeywordsView.vue' // [추가]

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: HomePage },

  { path: '/chatbot', name: 'ChatBot', component: ChatBot },

  { path: '/reservations', name: 'reservations',
    component: () => import('@/views/mentee/ReservationsView.vue') },

  { path: '/reservations/:id/card', name: 'session-card',
    component: () => import('@/views/mentee/SessionCardView.vue') },
  {
    path: '/mentee/chat/:sessionId',
    name: 'mentee-chat',
    component: () => import('@/views/mentee/ChatRoomView.vue'),
    props: r => ({ sessionId: String(r.params.sessionId), role: 'mentee' })
  },

  { path: '/mentor/chat/:sessionId', name: 'mentor-chat',
    component: () => import('@/views/mentee/ChatRoomView.vue'),
    props: r => ({ sessionId: String(r.params.sessionId), role: 'mentor' })
  },
  {
    path: '/mentors',
    name: 'mentors-list',
    component: () => import('@/views/mentor/MemtorListView.vue'), // ← 오타면 파일명도 수정
  },
  {
    path: '/mentors/:id',
    name: 'mentor-profile',
    component: MentorDetailPage,
    props: true,
  },
  {
    path: '/mentors/:id/book',
    name: 'mentor-book',
    component: ReservePage,
    props: true,
  },
    {
    path: '/consultation-card',
    name: 'ConsultationCard',
    component: ConsultationCard,
  },
  { path: '/review/:mentorId', name: 'ReviewKeywordsView', component: ReviewKeywordsView }, // [추가]

]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
