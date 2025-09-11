<!-- src/views/mentee/ReservationCardView.vue -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reservationCardMock } from '@/mocks/reservationCard'
import { ChevronLeft } from 'lucide-vue-next'
import BottomNav from '@/components/common/BottomNav.vue'

const router = useRouter()
const goBack = () => router.back()

const card = reservationCardMock
</script>

<template>
  <div class="min-h-dvh bg-gray-50 flex justify-center items-center">
    <div class="w-[430px] h-[932px] bg-white shadow-md overflow-hidden">
      <!-- 헤더 -->
      <header class="h-[85px] bg-[#578FFD] text-white flex items-center justify-between px-4">
          <button @click="goBack" class="w-12 h-12 rounded-full flex items-center justify-center">
            <ChevronLeft :size="25" class="text-white" />
          </button>
        <h1 class="text-[18px] font-semibold">상담</h1>
        <span class="w-6"></span>
      </header>

      <main class="p-5 space-y-6">
        <!-- 예약 정보 -->
         <p class="text-[20px] font-semibold text-gray-800 mb-10 mt-10 ml-14 mr-10 border-b border-gray-300">예약정보</p>
        <section class="mx-auto w-[340px] h-[120px] p-4 border rounded-[20px] flex items-center gap-4 bg-gray-50">
            <img
            :src="card.mentee.photoUrl"
            class="w-[70px] h-[70px] rounded-full object-cover"
            alt="mentee"
          />
          <div class="flex-1">
            <p class="text-[17px] font-semibold">{{ card.mentee.name }} ({{ card.mentee.age }}세)</p>
            <p class="text-[15px] text-gray-500">
              상담 예약 : {{ card.schedule.date }} {{ card.schedule.time }}
            </p>
          </div>
          <span class="text-[14px] bg-white border-[#FFBD01] border-[2px] text-yellow-700 px-3 py-1 rounded-full">
            3회차
          </span>
        </section>

        <!-- 상담카드 -->
        <section>
          <h2 class="text-[20px] font-semibold text-gray-800 mb-10 mt-10 ml-16 mr-10 border-b border-gray-300">상담카드</h2>
          <div class="mx-auto w-[350px] h-[250px] p-4 rounded-xl border bg-yellow-50 text-[17px] text-gray-800 whitespace-pre-wrap">
            {{ card.cardContent }}
        <p class="text-right text-12px text-gray-400 mt-[50px]">
            {{ card.cardContent.length }} / 500
          </p>
          </div>
        </section>

        <!-- 버튼 -->
        <div class="flex justify-center">
          <button
            class="w-[120px] h-[50px] px-6 mt-16 ml-[200px] rounded-xl bg-[#4A79F6] text-white text-[15px] font-semibold shadow-md"
          >
            상담 시작하기
          </button>
        </div>
      </main>
    </div>
    </div>
    <BottomNav />
</template>
