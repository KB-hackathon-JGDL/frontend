<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Session } from '@/types/mentoring'

const props = defineProps<{ session: Session }>()
const router = useRouter()

// 상담 날짜 라벨
const dateLabel = computed(() => {
  const d = new Date(props.session.datetime)
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${d.getHours()}시`
})

// 종료된 상담 → 읽기 전용 모드 진입
function goReadonly(e?: MouseEvent) {
  e?.stopPropagation()
  router.push({
    name: 'mentee-chat',
    params: { sessionId: props.session.id },
    query: { readonly: '1' },
  })
}
</script>

<template>
  <div class="space-y-3">
    <div
      @click="goReadonly"
      role="button" tabindex="0"
      @keydown.enter.prevent="goReadonly"
      @keydown.space.prevent="goReadonly"
      :class="[
        'rounded-3xl border bg-white p-8 md:p-10 shadow-md min-h-[120px] cursor-pointer transition',
        'border-blue-200/80 hover:shadow'
      ]"
    >
      <div class="flex items-center gap-9 pt-2 md:pt-4">
        <!-- ✅ 멘티 프로필 사진만 표시 -->
        <img
          :src="props.session.mentee.photoUrl ?? 'https://placehold.co/64x64?text='"
          class="w-24 h-24 rounded-full object-cover ring-2 ring-blue-200"
          alt="mentee"
        />
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <!-- ✅ 멘티 이름만 표시 -->
            <p class="text-[19px] font-semibold">{{ props.session.mentee.name }}</p>
            <span class="text-[15px] px-5 py-0.5 rounded-full bg-white text-gray-500 border border-gray-200">
              종료됨
            </span>
          </div>
          <p class="text-[15px] text-gray-500 mt-1">상담 예약일: {{ dateLabel }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
