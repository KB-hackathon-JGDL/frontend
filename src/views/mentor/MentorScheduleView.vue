<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ScheduleModal from '@/components/modal/ScheduleModal.vue'

const route = useRoute()
const mentorId = String(route.params.id || 'M-01')

const WEEK = ['일','월','화','수','목','금','토']
function fmt(d: Date) {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return { key: `${yyyy}-${mm}-${dd}`, dd, wk: WEEK[d.getDay()] }
}

const now = new Date()
const day = now.getDay()
const delta = ((8 - day) % 7) || 7
const start = new Date(now)
start.setDate(now.getDate() + delta)

const days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(start)
  d.setDate(start.getDate() + i)
  const f = fmt(d)
  return { key: f.key, label: f.dd, week: f.wk }
})

const TIMES = ['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00']

const selectedDateKey = ref(days[0].key)
const selectedMap = ref<Record<string, Set<string>>>({})

function ensure(dateKey: string) {
  if (!selectedMap.value[dateKey]) selectedMap.value[dateKey] = new Set<string>()
}

const selectedTimesOfDay = computed(() => {
  ensure(selectedDateKey.value)
  return selectedMap.value[selectedDateKey.value]
})

function toggle(t: string) {
  ensure(selectedDateKey.value)
  const set = selectedMap.value[selectedDateKey.value]
  set.has(t) ? set.delete(t) : set.add(t)
  selectedMap.value = { ...selectedMap.value }
}

function save() {
  const payload = Object.entries(selectedMap.value).map(([date, set]) => ({
    date,
    times: Array.from(set).sort()
  }))
  localStorage.setItem(`mentorAvailability:${mentorId}`, JSON.stringify(payload))
  alert('저장되었습니다.')
}

/* 모달 연결 */
const showScheduleModal = ref(false)
const timesArray = computed(() => Array.from(selectedTimesOfDay.value))
function openScheduleModal() { showScheduleModal.value = true }
function closeScheduleModal() { showScheduleModal.value = false }
function confirmScheduleModal() {
  save()
  closeScheduleModal()
}
</script>

<template>
  <div class="min-h-dvh grid place-items-center bg-[#EAF0FF]">
    <div class="relative w-[430px] h-[932px] shadow-2xl overflow-hidden bg-[#4A79F6]">
      <header class="h-[85px] px-5 flex items-center text-white">
        <p class="text-[20px] font-semibold">예약 관리</p>
      </header>
 
      <main class="absolute inset-x-0 bottom-0 top-[85px] bg-white overflow-y-auto">
        <div class="px-5 py-6"> 
          <p class="text-[20px] font-semibold text-gray-800 mb-[20px] mt-[15px] ml-[10px]">다음주 일정을 선택해주세요.</p>

          <div class="border-t border-gray-200 pt-4">
            <p class="text-[20px] font-semibold text-gray-500 mt-[10px] mb-[20px] ml-[10px]">날짜 선택</p>

            <div class="flex gap-2 overflow-x-auto pb-2">
              <button
                v-for="d in days" :key="d.key"
                @click="selectedDateKey = d.key"
                :class="[
                  'w-[40px] h-[40px] rounded-[10px] border grid place-items-center shrink-0 text-[15px] ml-[10px]',  
                  selectedDateKey === d.key
                    ? 'bg-[#4A79F6] text-white border-[#4A79F6]'
                    : 'bg-white text-gray-700 border-gray-200'
                ]"
                :title="`${d.key} (${d.week})`"
              >
                {{ d.label }}
              </button>
            </div>

            <div class="mt-1 flex gap-2 overflow-x-auto px-1 text-gray-400 text-[15px] mt-[10px] ml-[10px] gap-[25px]">
              <span
                v-for="d in days" :key="d.key"
                class="w-12 text-center shrink-0 tracking-tighter"
              >
                {{ d.week }}
              </span>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4 mt-[70px]">
            <p class="text-[20px] font-semibold text-gray-500 mt-[10px] mb-[20px] ml-[10px]">시간 선택</p>
            <div class="grid grid-cols-4 gap-3">
              <button
                v-for="t in TIMES" :key="t"
                @click="toggle(t)"
                :class="[
                  'w-[70px] h-[40px] rounded-xl border text-[15px] ml-[10px]',
                  selectedTimesOfDay.has(t) ? 'bg-[#FFBD01] text-white border-[#FFBD01] font-semibold' : 'bg-white text-gray-700 border-gray-200'
                ]"
              >
                {{ t }}
              </button>
            </div>
          </div>

          <div class="mt-[80px] border-t border-gray-200 pt-6 flex justify-center">
            <button
              class="w-[270px] h-[60px] mt-[80px] rounded-xl bg-[#FFC727] text-[15px] text-white font-semibold shadow-md active:scale-[0.99]"
              @click="openScheduleModal"
            >
              저장하기
            </button>
          </div>
        </div>
      </main>
    </div>

<ScheduleModal
  v-if="showScheduleModal"
  :show="showScheduleModal"
  @cancel="closeScheduleModal"
  @confirm="confirmScheduleModal"
/>
  </div>
</template>
