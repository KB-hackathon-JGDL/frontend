<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'

/** 시간 슬롯 생성: 10:00 ~ 21:00 (1시간 간격) */
function generateSlots(start = 10, end = 21) {
  const slots: string[] = []
  for (let h = start; h <= end; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
  }
  return slots
}

type Availability = Record<string, string[]> // 날짜 ISO -> 시간배열
type MentorAvailability = Record<string, Availability>

// ✅ 멘토별 목데이터: 모든 날짜 동일하게 10~21시
const AVAIL: MentorAvailability = {
  'M-01': {
    '2025-03-08': generateSlots(10, 21),
    '2025-03-09': generateSlots(10, 21),
    '2025-03-10': generateSlots(10, 21),
    '2025-03-11': generateSlots(10, 21),
    '2025-03-12': generateSlots(10, 21),
    '2025-03-13': generateSlots(10, 21),
    '2025-03-14': generateSlots(10, 21),
  },
  'M-02': {
    '2025-03-08': generateSlots(10, 21),
    '2025-03-09': generateSlots(10, 21),
    '2025-03-10': generateSlots(10, 21),
  },
}

const router = useRouter()
const route = useRoute()
const mentorId = computed(() => String(route.params.id || 'M-01'))
const canGoNext = computed(() => !!(selectedDate.value && selectedTime.value))
const availability = computed<Availability>(() => AVAIL[mentorId.value] || {})

// 날짜/요일 라벨
const WEEK = ['일', '월', '화', '수', '목', '금', '토']
function label(dateISO: string) {
  const d = new Date(`${dateISO}T00:00:00`)
  return {
    dd: String(d.getDate()).padStart(2, '0'),
    wk: WEEK[d.getDay()],
  }
}

// 초기 선택: 첫 번째 날짜
const dateKeys = computed(() =>
  Object.keys(availability.value).sort((a, b) => a.localeCompare(b))
)
const selectedDate = ref<string>(dateKeys.value[0] || '')
const selectedTime = ref<string>('')

// 메모/동의
const note = ref('')
const agree = ref(false)

function pickDate(d: string) {
  selectedDate.value = d
  selectedTime.value = '' // 날짜 바꾸면 시간 초기화
}
function pickTime(t: string) {
  selectedTime.value = t
}

function canSubmit() {
  return selectedDate.value && selectedTime.value && agree.value
}

function submit() {
  if (!canSubmit()) return
  alert(
    `예약 요청 완료!\n멘토: ${mentorId.value}\n날짜: ${selectedDate.value}\n시간: ${selectedTime.value}\n요청: ${note.value}`
  )
  router.back()
}

function goConsultationCard() {
  if (!canGoNext.value) return
  router.push({ name: 'ConsultationCard' })
}
</script>

<template>
  <div class="min-h-dvh bg-[#F4F6FE]">
    <!-- 헤더 -->
    <header class="sticky top-0 z-10 h-[85px] bg-[#4A79F6] text-white">
      <div class="h-[64px] flex items-center gap-2 px-5 pt-8">
        <button @click="router.back()">
          <ChevronLeft class="w-8 h-8" />
        </button>
        <h1 class="text-[18px] font-semibold">상담</h1>
      </div>
    </header>

    <main class="max-w-[480px] mx-auto p-4 pb-28">
      <section
        class="bg-white min-h-[830px] border border-[#E6EAF5] rounded-3xl shadow-sm overflow-hidden"
      >
        <!-- 타이틀 -->
        <div
          class="px-5 py-6 border-b border-[#E6EAF5] flex items-center gap-5"
        >
          <h2 class="text-[20px] font-semibold">채팅상담 예약</h2>

          <!-- 툴팁 아이콘 -->
          <div class="relative inline-block group">
            <button
              type="button"
              aria-label="상담 시간 안내"
              class="inline-flex items-center justify-center w-7 h-7 rounded-full
                     border-[2px] border-[#FFBD01] bg-[#FFF3BF] text-[#C38F00] text-[11px] font-bold
                     shadow-sm focus:outline-none"
              tabindex="0"
            >
              ?
            </button>
            <!-- 툴팁 -->
            <div
              class="absolute left-1/2 -translate-x-1/2 mt-2 hidden
                     group-hover:block group-focus-within:block z-20"
              role="tooltip"
            >
              <div
                class="relative rounded-xl bg-gray-900 text-white text-[12px] leading-snug p-3 shadow-lg whitespace-nowrap"
              >
                상담은 평일 10:00 ~ 21:00 (1시간 단위)로 진행돼요.
                <span
                  class="absolute -top-2 left-1/2 -translate-x-1/2
                         block w-3 h-3 rotate-45 bg-gray-900"
                ></span>
              </div>
            </div>
          </div>
        </div>

        <!-- 날짜 + 시간 -->
        <div class="px-5 py-4 space-y-8">
          <!-- 날짜 선택 -->
          <div>
            <p class="text-[18px] font-semibold">날짜 선택</p>
            <div class="mt-5 grid grid-cols-7 gap-3">
              <div
                v-for="d in dateKeys"
                :key="d"
                class="flex flex-col items-center"
              >
                <button
                  class="h-16 w-16 rounded-xl border text-[15px] font-semibold flex items-center justify-center"
                  :class="[
                    selectedDate === d
                      ? 'border-[#4A79F6] text-[#4A79F6] bg-[#EEF3FF]'
                      : 'border-[#E6EAF5] text-gray-800 bg-white'
                  ]"
                  @click="pickDate(d)"
                >
                  {{ label(d).dd }}
                </button>
                <span class="mt-1 text-[15px] text-gray-500">
                  {{ label(d).wk }}
                </span>
              </div>
            </div>
          </div>

          <!-- 시간 선택 -->
          <div>
            <p class="text-[18px] font-semibold">시간 선택</p>
            <div class="mt-5 grid grid-cols-4 gap-5 pb-8">
              <button
                v-for="t in (availability[selectedDate] || [])"
                :key="t"
                class="rounded-xl border text-[17px] w-[84px] h-20"
                :class="[
                  selectedTime === t
                    ? 'border-[#4A79F6] text-[#4A79F6] bg-[#EEF3FF]'
                    : 'border-[#D9D9D9] text-gray-800 bg-white'
                ]"
                @click="pickTime(t)"
              >
                {{ t }}
              </button>

              <p
                v-if="!(availability[selectedDate] || []).length"
                class="col-span-4 text-center text-gray-400 text-sm"
              >
                선택한 날짜에 가능한 시간이 없어요.
              </p>
            </div>
          </div>

          <!-- 다음 버튼 -->
<!-- 버튼 영역 -->
<div class="flex justify-end px-[20px] mt-8">
  <button
    class="h-20 px-14 rounded-xl bg-[#FFBD01] text-white text-[15px] font-semibold hover:brightness-95 disabled:opacity-40"
    :disabled="!canGoNext"
    @click="goConsultationCard"
  >
    예약하기
  </button>
</div>

        </div>
      </section>
    </main>
  </div>
</template>
