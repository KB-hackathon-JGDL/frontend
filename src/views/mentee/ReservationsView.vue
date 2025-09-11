<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SegmentedTabs from '@/components/mentee/SegmentedTabs.vue'
import SessionCard from '@/components/mentee/SessionCard.vue'
import EndedSessionCard from '@/components/chat/EndedSessionCard.vue'
import { useSessionStore } from '@/stores/useSession'
import MentorSessionCard from '@/components/memtor/MentorSessionCard.vue'
import MentorEndedSessionCard from '@/components/memtor/MentorEndedSessionCard.vue'
import mentorSessions from '@/mocks/mentorSessions'
import BottomNav from '@/components/common/BottomNav.vue'

const route = useRoute()
const store = useSessionStore()

const isMentor = computed(() => String(route.query.role ?? '') === 'mentor')
const tab = ref<'upcoming' | 'completed'>('upcoming')
watch(isMentor, () => { tab.value = 'upcoming' })

const mentorId = computed(() => String(route.params.mentorId || ''))
const usingBackend = computed(() => !!mentorId.value)

onMounted(() => {
  if (usingBackend.value) {
    store.fetchReservations(mentorId.value)
  } else {
    // ✅ 목데이터 사용
    store.loadMockReservations()
  }
})

watch(() => route.params.mentorId, (nv) => {
  const id = String(nv || '')
  if (id) store.fetchReservations(id)
})

const upcomingList = computed(() =>
  usingBackend.value ? store.upcomingReservations : store.upcomingReservations
)
const completedList = computed(() =>
  usingBackend.value ? store.completedReservations : store.completedReservations
)

// 멘토 탭(Mock)
type MentorSession = (typeof mentorSessions)[number]
const mentorAll = ref<MentorSession[]>(mentorSessions as any)
const mentorUpcoming = computed(() => mentorAll.value.filter(s => String(s.status).toLowerCase() === 'scheduled'))
const mentorCompleted = computed(() => mentorAll.value.filter(s => String(s.status).toLowerCase() !== 'scheduled'))

const expandedId = ref<string | null>(null)
watch(tab, () => { expandedId.value = null })

const retryFetch = async () => {
  if (usingBackend.value) await store.fetchReservations(mentorId.value)
  else store.loadMockReservations()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="sticky top-0 z-10 bg-[#578FFD] text-white shadow">
      <div class="h-[85px] px-4 flex items-center">
        <h1 class="text-[18px] font-semibold">예약 목록</h1>
      </div>
    </header>

    <div class="bg-white border-b">
      <SegmentedTabs v-model="tab" />
    </div>

    <main class="px-4 py-3 space-y-3 max-w-screen-sm mx-auto w-full">
      <template v-if="!isMentor">
        <template v-if="tab === 'upcoming'">
          <SessionCard
            v-for="s in upcomingList"
            :key="s.id"
            :session="s"
            :expanded="expandedId === s.id"
            :highlight="expandedId === s.id"
            :show-actions="true"
            @toggle="(id) => (expandedId = expandedId === id ? null : id)"
          />
          <div v-if="!upcomingList.length" class="text-center text-sm text-gray-500 py-10">
            <p>예약된 상담이 없습니다.</p>
          </div>
        </template>

        <template v-else>
          <EndedSessionCard v-for="s in completedList" :key="s.id" :session="s" />
          <div v-if="!completedList.length" class="text-center text-sm text-gray-500 py-10">
            <p>종료된 상담이 없습니다.</p>
          </div>
        </template>
      </template>

      <template v-else>
        <template v-if="tab === 'upcoming'">
          <MentorSessionCard
            v-for="s in mentorUpcoming"
            :key="s.id"
            :session="s"
            :expanded="expandedId === s.id"
            :highlight="expandedId === s.id"
            :show-actions="true"
            @toggle="(id) => (expandedId = expandedId === id ? null : id)"
          />
          <p v-if="!mentorUpcoming.length" class="text-center text-sm text-gray-500 py-10">예약된 상담이 없습니다.</p>
        </template>
        <template v-else>
          <MentorEndedSessionCard v-for="s in mentorCompleted" :key="s.id" :session="s" />
          <p v-if="!mentorCompleted.length" class="text-center text-sm text-gray-500 py-10">종료된 상담이 없습니다.</p>
        </template>
      </template>
    </main>
  </div>
  <BottomNav />
</template>
