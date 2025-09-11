<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

type Status = 'scheduled' | 'completed' | 'canceled'
interface Person { id: string; name: string; photoUrl?: string }
export interface MentorSession {
  id: string
  mentee: Person
  turnCurrent: number
  datetime: string
  status: Status
  card?: { goal?: string; context?: string; questions?: string[] }
}

const props = withDefaults(defineProps<{
  session: MentorSession
  expanded?: boolean
  highlight?: boolean
  showActions?: boolean
}>(), { expanded: false, highlight: false, showActions: true })

const emit = defineEmits<{ toggle: [id: string] }>()
const router = useRouter()

const dateLabel = computed(() => {
  const d = new Date(props.session.datetime)
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${d.getHours()}시`
})

function goChat(e?: MouseEvent) {
  e?.stopPropagation()
  router.push({ name: 'mentee-chat', params: { sessionId: props.session.id } }) 
}
function openCard(e?: MouseEvent) {
  e?.stopPropagation()
  router.push({ name: 'session-card', params: { id: props.session.id } })
}
</script>

<template>
  <div class="space-y-3">
    <div
      @click="emit('toggle', session.id)"
      role="button"
      tabindex="0"
      @keydown.enter.prevent="emit('toggle', session.id)"
      @keydown.space.prevent="emit('toggle', session.id)"
      :class="[
        'rounded-3xl border bg-white p-8 md:p-10 shadow-md min-h-[120px] cursor-pointer transition',
        highlight ? 'border-blue-300 ring-1 ring-blue-200' : 'border-blue-200/80 hover:shadow'
      ]"
    >
      <div class="flex items-center gap-9 pt-2 md:pt-4">
        <img
          :src="session.mentee.photoUrl ?? 'https://placehold.co/64x64?text='"
          class="w-24 h-24 rounded-full object-cover ring-2 ring-blue-200"
          alt="mentee"
        />
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <p class="text-[19px] font-semibold">{{ session.mentee.name }}</p>
            <span class="text-[15px] px-5 py-0.5 rounded-full bg-white text-yellow-700 border border-yellow-200">
              {{ session.turnCurrent }} 회차 상담
            </span>
          </div>
          <p class="text-[15px] text-gray-500 mt-1">상담 예약일: {{ dateLabel }}</p>
        </div>
      </div>
    </div>

    <div v-if="showActions && expanded" class="px-8 md:px-10 mt-2">
      <div class="flex gap-3">
        <button
          @click.stop="goChat($event)"
          class="flex-1 h-16 rounded-full text-[15px] font-semibold shadow bg-[#FFBD01] text-white hover:brightness-95">
          상담 하러가기
        </button>

        <button
          @click.stop="openCard"
          class="flex-1 h-16 rounded-full border border-gray-200 text-gray-700 text-[13px] bg-white hover:bg-gray-50">
          상담카드 확인
        </button>
      </div>
    </div>
  </div>
</template>
