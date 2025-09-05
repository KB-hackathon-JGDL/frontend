<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useSessionStore } from '@/stores/session'
import SegmentedTabs from '@/components/mentee/SegmentedTabs.vue'
import SessionCard from '@/components/mentee/SessionCard.vue'
import EndedSessionCard from '@/components/chat/EndedSessionCard.vue'

const store = useSessionStore()
const tab = ref<'upcoming' | 'completed'>('upcoming')

// 탭별 펼침 상태를 분리해 관리
const expandedUpcomingId = ref<string | null>(null)
const expandedCompletedId = ref<string | null>(null)

onMounted(() => {
  if (!store.sessions.length) store.loadMock?.()
})

// 탭 전환 시 펼침 초기화(선택)
watch(tab, () => {
  expandedUpcomingId.value = null
  expandedCompletedId.value = null
})

const toggleUpcoming = (id: string) => {
  expandedUpcomingId.value = expandedUpcomingId.value === id ? null : id
}
const toggleCompleted = (id: string) => {
  expandedCompletedId.value = expandedCompletedId.value === id ? null : id
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="sticky top-0 z-10 bg-[#4A79F6] text-white shadow">
      <div class="h-[85px] px-4 flex items-center">
        <h1 class="text-[18px] font-semibold">예약/종료된 상담</h1>
      </div>
    </header>

    <div class="bg-white border-b">
      <SegmentedTabs v-model="tab" />
    </div>

    <div class="px-4 py-3 space-y-3">
      <!-- 예약된 상담 -->
      <template v-if="tab === 'upcoming'">
        <SessionCard
          v-for="s in store.upcoming"
          :key="s.id"
          :session="s"
          :expanded="expandedUpcomingId === s.id"
          :highlight="expandedUpcomingId === s.id"
          :show-actions="true"
          @toggle="toggleUpcoming"
        />
        <p v-if="!store.upcoming.length" class="text-center text-sm text-gray-500 py-10">
          예약된 상담이 없습니다.
        </p>
      </template>

      <!-- 종료된 상담도 ‘똑같이’ 클릭 시 펼쳐서 버튼 2개 노출 -->
      <template v-else>
        <EndedSessionCard
        v-for="s in store.completed"
        :key="s.id"
        :session="s"
        />
        <p v-if="!store.completed.length" class="text-center text-sm text-gray-500 py-10">
          종료된 상담이 없습니다.
        </p>
      </template>
    </div>
  </div>
</template>
