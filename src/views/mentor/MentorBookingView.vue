<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMentorStore } from '@/stores/useMentor'
import { useSessionStore } from '@/stores/useSession'

const route = useRoute()
const router = useRouter()
const mentorStore = useMentorStore()
const sessionStore = useSessionStore()

onMounted(() => mentorStore.loadMock())

const id = String(route.params.id || '')
const mentor = computed(() => mentorStore.getById(id))

const days = Array.from({ length: 14 }).map((_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const w = ['일','월','화','수','목','금','토'][d.getDay()]
  return { key: `${yyyy}-${mm}-${dd}`, d, label: dd, week: w }
})

const selectedDateKey = ref(days[0].key)
const slots = computed(() => mentorStore.slotsByDate(id, selectedDateKey.value))
const selectedTime = ref<string>('')

const canNext = computed(() => !!selectedTime.value)

function goNext() {
  if (!mentor.value || !canNext.value) return
  const iso = new Date(`${selectedDateKey.value}T${selectedTime.value}:00+09:00`).toISOString()
  const sid = sessionStore.createReservationLocal(
    { id: mentor.value.id, name: mentor.value.name, photoUrl: mentor.value.photoUrl },
    iso
  )
  router.replace({ name: 'reservations' }) 
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-[#578FFD] text-white">
      <div class="h-[85px] px-4 flex items-center justify-between">
        <button @click="$router.back()" class="w-10 h-10 rounded-full bg-white/20 grid place-items-center">←</button>
        <p class="text-[23px] font-semibold">상담</p>
        <span class="w-10"></span>
      </div>
    </header>

    <div v-if="mentor" class="px-4 py-5 max-w-screen-sm mx-auto space-y-4">
      <div class="rounded-2xl border bg-white p-4 shadow-sm">
        <p class="text-[15px] font-semibold mb-2">채팅상담 예약 😊</p>

        <p class="text-[13px] text-gray-500 mb-2">날짜 선택</p>
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="d in days" :key="d.key"
            @click="selectedDateKey = d.key"
            :class="[
              'w-12 h-12 rounded-full border grid place-items-center text-[14px]',
              selectedDateKey === d.key
                ? 'bg-[#4A79F6] text-white border-[#4A79F6]'
                : 'bg-white text-gray-700 border-gray-200'
            ]"
            :title="`${d.key} (${d.week})`"
          >
            {{ d.label }}
          </button>
        </div>

        <p class="text-[13px] text-gray-500 mt-4 mb-2">시간 선택</p>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="t in slots" :key="t"
            @click="selectedTime = t"
            :class="[
              'h-10 rounded-xl border text-[13px]',
              selectedTime === t
                ? 'bg-[#FFBD01] text-white border-[#FFBD01] font-semibold'
                : 'bg-white text-gray-700 border-gray-200'
            ]"
          >
            {{ t }}
          </button>
          <p v-if="!slots.length" class="col-span-4 text-center text-sm text-gray-500 py-6">
            선택한 날짜에 예약 가능한 시간이 없습니다.
          </p>
        </div>

        <div class="mt-5">
          <button
            :disabled="!canNext"
            @click="goNext"
            class="w-full h-12 rounded-xl bg-[#FFBD01] text-white font-semibold shadow
                   disabled:opacity-50 disabled:cursor-not-allowed">
            다음
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
