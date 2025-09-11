import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/home/HomeView.vue'
import ChatBot from '@/views/chat/ChatBot.vue'
import MentorDetailPage from '@/views/mentor/MentorDetailPage.vue'
import ReservePage from '@/views/mentor/ReservePage.vue'
import ConsultationCard from '@/views/mentor/ConsultationCard.vue'
import ReviewKeywordsView from '@/views/mentee/ReviewKeywordsView.vue'
import SurveyOptionButton from '@/components/survey/SurveyOptionButton.vue'
import SurveyQuestionView from '@/views/survey/SurveyQuestionView.vue'

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
    component: () => import('@/views/mentor/MemtorListView.vue'),
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
  { path: '/review/:mentorId', name: 'ReviewKeywordsView', component: ReviewKeywordsView },
  
  { path: '/supports', name: 'supports-list', component: () => import('@/views/supports/SupportListView.vue') },

    {
    path: '/supports/:id',
    name: 'support-detail',
    component: () => import('@/views/supports/SupportDetailView.vue'),
  },
  { path: '/survey/result', name: 'survey-result', component: () => import('@/views/survey/SurveyResultView.vue') },
   { path: '/survey/:step(\\d+)?', name: 'survey', component: () => import('@/views/survey/SurveyQuestionView.vue') },
   {
  path: '/finance/all',
  name: 'finance-all',
  component: () => import('@/views/finance/FinanceAllProductsView.vue'),
},
{
  path: '/finance/products/:id',
  name: 'finance-product-detail',
  component: () => import('@/views/finance/FinanceProductDetailView.vue'),
  props: true,
},

]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
