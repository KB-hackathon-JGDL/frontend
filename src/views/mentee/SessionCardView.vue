<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/useSession'
import type { Session } from '@/types/mentoring'
import BottomNav from '@/components/common/BottomNav.vue'

const route = useRoute()
const router = useRouter()
const store = useSessionStore()

const idParam = computed(() => String(route.params.id ?? ''))
const isInvalidParam = computed(() => !idParam.value || idParam.value.startsWith(':'))
const isMockId = computed(() => idParam.value.startsWith('session-'))

const isLoading = ref(true)
const loadError = ref<string | null>(null)

const session = computed<Session | undefined>(() => {
  const s = store.getById(idParam.value)
  return s as Session | undefined
})

const dateLabel = computed(() => {
  if (!session.value) return ''
  const d = new Date(session.value.datetime)
  const mm = d.getMonth() + 1
  const dd = d.getDate()
  const hh = d.getHours().toString().padStart(2, '0')
  return `${mm}월 ${dd}일 ${hh}시`
})

function goBack() { router.back() }

onMounted(async () => {
  try {
    if (isInvalidParam.value) {
      loadError.value = '잘못된 예약 ID입니다.'
      return
    }
    if (isMockId.value) {
      if (!session.value) loadError.value = '예약을 찾을 수 없습니다.'
      return
    }
    if (!session.value) {
      await store.fetchReservation(idParam.value)
    }
  } catch (e: any) {
    loadError.value = e?.message || '예약 정보를 불러오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="min-h-dvh grid place-items-center bg-[#EAF0FF] p-4">
    <div class="w-[430px] min-h-[720px] bg-white rounded-2xl shadow-xl overflow-hidden">
      <header class="h-[72px] px-5 flex items-center justify-between bg-[#4A79F6] text-white">
        <button class="w-10 h-10 rounded-full bg-white/20 grid place-items-center" @click="goBack">←</button>
        <p class="text-[18px] font-semibold">상담카드</p>
        <span class="w-10" />
      </header>

      <main class="p-5">
        <div v-if="isLoading" class="space-y-3">
          <div class="h-6 w-40 bg-gray-100 rounded animate-pulse" />
          <div class="h-4 w-60 bg-gray-100 rounded animate-pulse" />
          <div class="h-32 w-full bg-gray-100 rounded animate-pulse" />
        </div>

        <div v-else-if="loadError" class="text-red-600 text-sm">
          {{ loadError }}
        </div>

        <div v-else-if="session" class="space-y-6">
          <section class="flex items-center gap-4">
            <img
              :src="session.mentor?.photoUrl ?? 'https://placehold.co/64x64?text=M'"
              class="w-16 h-16 rounded-full object-cover ring-2 ring-blue-200"
              alt="mentor"
            />
            <div>
              <p class="text-[18px] font-semibold text-gray-900">{{ session.mentor?.name ?? '상담사' }}</p>
              <p class="text-[13px] text-gray-500">상담 예약일: {{ dateLabel }}</p>
            </div>
          </section>

          <section class="border-t border-gray-200 pt-4">
            <p class="text-[14px] text-gray-600 mb-2">상담카드 내용</p>
            <div
              v-if="session.card?.context"
              class="rounded-xl border border-gray-200 p-4 text-[14px] text-gray-800 whitespace-pre-wrap leading-6"
            >
              {{ session.card.context }}
            </div>
            <div v-else class="rounded-xl border border-dashed border-gray-200 p-4 text-[14px] text-gray-400">
              등록된 상담카드가 없습니다.
            </div>
          </section>
        </div>

        <div v-else class="text-sm text-gray-500">
          예약을 찾을 수 없습니다.
        </div>
      </main>
    </div>
  </div>
  <BottomNav />

</template>
