<script setup lang="ts">
import { ref } from 'vue'
import type { SupportItem } from '@/types/support'
import { Heart } from 'lucide-vue-next'
import { useRouter } from 'vue-router'            // 👉 추가

const props = defineProps<{ item: SupportItem }>()
const liked = ref(false)
const router = useRouter()                         // 👉 추가

const toggleLike = (e: MouseEvent) => {
  e.stopPropagation()
  liked.value = !liked.value
}

// 👉 추가: 상세로 이동
const goDetail = () => {
  // 네임드 라우트가 있으면 권장
  // router.push({ name: 'support-detail', params: { id: props.item.id } })
  // 네임드 라우트가 아직 없다면 경로로 이동
  router.push(`/supports/${props.item.id}`)
}
</script>

<template>
  <main class="px-1 py-0 flex flex-col gap-0">
    <article
      class="w-[380px] h-[190px] bg-white rounded-2xl p-3 ring-1 ring-gray-100 shadow-[0_8px_24px_rgba(0,0,0,.06)] mx-auto mt-4"
    >
      <div class="flex items-center gap-4 h-full">
        <!-- 👉 여기 클릭 시 상세 이동 -->
        <div
          class="shrink-0 w-[120px] h-[160px] rounded-xl overflow-hidden rounded-lg border-2 border-[#DFDFDF] cursor-pointer"
          @click="goDetail"
        >
          <img :src="item.thumbnail" class="w-full h-full object-contain scale-125 origin-center" alt="" />
        </div>

        <div class="flex-0 min-w-0 flex flex-col justify-center">
          <h3 class="text-[16px] font-semibold text-gray-800 leading-snug line-clamp-2">
            {{ props.item.title }}
          </h3>

          <dl class="mt-3 space-y-1 text-[13px] text-gray-600">
            <div class="flex gap-3 items-baseline">
              <dt class="shrink-0 w-[65px] whitespace-nowrap text-gray-400">분야</dt>
              <dd class="min-w-0 truncate">{{ props.item.subtitle || '정보 준비중' }}</dd>
            </div>
            <div class="flex gap-3 items-baseline">
              <dt class="shrink-0 w-[65px] whitespace-nowrap text-gray-400">대상</dt>
              <dd class="min-w-0 truncate">{{ props.item.target || '정보 준비중' }}</dd>
            </div>
            <div class="flex gap-3 items-baseline">
              <dt class="shrink-0 w-[65px] whitespace-nowrap text-gray-400">지원</dt>
              <dd class="min-w-0 truncate">{{ props.item.org || '정보 준비중' }}</dd>
            </div>
            <div class="flex gap-3 items-baseline">
              <dt class="shrink-0 w-[65px] whitespace-nowrap text-gray-400">신청기간</dt>
              <dd class="min-w-0 truncate">
                {{ props.item.periodStart || '미정' }} ~ {{ props.item.periodEnd || '미정' }}
              </dd>
            </div>
            <div class="flex gap-3 items-baseline">
              <dt class="shrink-0 w-[65px] whitespace-nowrap text-gray-400">발표일</dt>
              <dd class="min-w-0 truncate">{{ props.item.announceDate || '미정' }}</dd>
            </div>
          </dl>

          <button
            class="self-center ml-auto w-8 h-8 rounded-full grid place-items-center transition hover:scale-105"
            :class="liked ? 'text-rose-500 bg-rose-50' : 'text-gray-400 hover:text-rose-500'"
            :aria-pressed="liked"
            @click="toggleLike"
          >
            <Heart :size="18" :fill="liked ? 'currentColor' : 'none'" />
          </button>
        </div>
      </div>
    </article>
  </main>
</template>
