import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/home/HomeView.vue'
import ChatBot from '@/views/chat/ChatBot.vue'
import MentorDetailPage from '@/views/mentor/MentorDetailPage.vue'
import ReservePage from '@/views/mentor/ReservePage.vue'
import ConsultationCard from '@/views/mentor/ConsultationCard.vue'
import ReviewKeywordsView from '@/views/mentee/ReviewKeywordsView.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: HomePage },

  { path: '/chatbot', name: 'ChatBot', component: ChatBot },

  // 멘토별 예약 목록 (mentorId는 라우트 파라미터)
  {
    path: '/mentors/:mentorId/reservations',
    name: 'mentor-reservations',
    component: () => import('@/views/mentee/ReservationsView.vue'),
    props: true,
  },

  // 상담카드(단건)
{
  path: '/reservations',
  name: 'reservations',
  component: () => import('@/views/mentee/ReservationsView.vue'),
},

{
  path: '/reservations/:id/card',
  name: 'reservation-card',
  component: () => import('@/views/mentee/ReservationCardView.vue'),
  props: true,
},


  // 채팅
  {
    path: '/mentee/chat/:sessionId',
    name: 'mentee-chat',
    component: () => import('@/views/mentee/ChatRoomView.vue'),
    props: r => ({ sessionId: String(r.params.sessionId), role: 'mentee' }),
  },
  {
    path: '/mentor/chat/:sessionId', // ✅ 중복 경로 수정
    name: 'mentor-chat',
    component: () => import('@/views/mentee/ChatRoomView.vue'),
    props: r => ({ sessionId: String(r.params.sessionId), role: 'mentor' }),
  },

  // 멘토 리스트/프로필/예약
  {
    path: '/mentors',
    name: 'mentors-list',
    component: () => import('@/views/mentor/MemtorListView.vue'), // (경로 유지)
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

  // 상담카드 작성(멘티)
  { path: '/consultation-card', name: 'ConsultationCard', component: ConsultationCard },

  // 리뷰/지원/설문/기타
  { path: '/review/:mentorId', name: 'ReviewKeywordsView', component: ReviewKeywordsView },
  { path: '/supports', name: 'supports-list', component: () => import('@/views/supports/SupportListView.vue') },
  { path: '/supports/:id', name: 'support-detail', component: () => import('@/views/supports/SupportDetailView.vue') },
  { path: '/survey/result', name: 'survey-result', component: () => import('@/views/survey/SurveyResultView.vue') },
  { path: '/survey/:step(\\d+)?', name: 'survey', component: () => import('@/views/survey/SurveyQuestionView.vue') },

  // 파이낸스
  { path: '/finance/all', name: 'finance-all', component: () => import('@/views/finance/FinanceAllProductsView.vue') },
  {
    path: '/finance/products/:id',
    name: 'finance-product-detail',
    component: () => import('@/views/finance/FinanceProductDetailView.vue'),
    props: true,
  },

  // 로그인
  { path: '/login', name: 'Login', component: () => import('@/views/auth/LoginView.vue') },

  // 멘토 스케줄
  { path: '/mentor/:id/schedule', name: 'mentor-schedule', component: () => import('@/views/mentor/MentorScheduleView.vue') },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
