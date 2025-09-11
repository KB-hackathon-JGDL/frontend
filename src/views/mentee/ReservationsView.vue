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

const route = useRoute()
const isMentor = computed(() => String(route.query.role ?? '') === 'mentor')

const tab = ref<'upcoming' | 'completed'>('upcoming')
watch(isMentor, () => { tab.value = 'upcoming' })

const store = useSessionStore()
onMounted(() => { if (!store.sessions.length) store.loadMock?.() })
const menteeUpcoming  = computed(() => store.upcoming)
const menteeCompleted = computed(() => store.completed)

type MentorSession = typeof mentorSessions[number]
const mentorAll       = ref<MentorSession[]>(mentorSessions as any)

if (!mentorAll.value?.length) {
  mentorAll.value = [
    {
      id: 'MS-9991',
      mentee: { id: 'U-x1', name: '테스트 멘티', photoUrl: '' },
      turnCurrent: 1,
      datetime: new Date(Date.now() + 86400000).toISOString(),
      status: 'scheduled'
    },
    {
      id: 'MS-9992',
      mentee: { id: 'U-x2', name: '예전 멘티', photoUrl: '' },
      turnCurrent: 2,
      datetime: new Date(Date.now() - 86400000 * 3).toISOString(),
      status: 'completed'
    }
  ] as any
}

const mentorUpcoming  = computed(() => mentorAll.value.filter(s => String(s.status).toLowerCase() === 'scheduled'))
const mentorCompleted = computed(() => mentorAll.value.filter(s => String(s.status).toLowerCase() !== 'scheduled'))

const expandedId = ref<string | null>(null)
watch(tab, () => { expandedId.value = null })
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="sticky top-0 z-10 bg-[#578FFD] text-white shadow">
      <div class="h-[85px] px-4 flex items-center">
        <h1 class="text-[18px] font-semibold">
          예약/종료된 상담 <span v-if="isMentor" class="opacity-80 text-[#23]">(멘토)</span>
        </h1>
      </div>
    </header>

    <div class="bg-white border-b">
      <SegmentedTabs v-model="tab" />
    </div>

    <main class="px-4 py-3 space-y-3 max-w-screen-sm mx-auto w-full">
      <template v-if="!isMentor">
        <template v-if="tab === 'upcoming'">
          <SessionCard
            v-for="s in menteeUpcoming" :key="s.id"
            :session="s"
            :expanded="expandedId === s.id"
            :highlight="expandedId === s.id"
            :show-actions="true"
            @toggle="id => expandedId = (expandedId === id ? null : id)"
          />
          <p v-if="!menteeUpcoming.length" class="text-center text-sm text-gray-500 py-10">예약된 상담이 없습니다.</p>
        </template>
        <template v-else>
          <EndedSessionCard v-for="s in menteeCompleted" :key="s.id" :session="s" />
          <p v-if="!menteeCompleted.length" class="text-center text-sm text-gray-500 py-10">종료된 상담이 없습니다.</p>
        </template>
      </template>

      <template v-else>
        <template v-if="tab === 'upcoming'">
          <MentorSessionCard
            v-for="s in mentorUpcoming" :key="s.id"
            :session="s"
            :expanded="expandedId === s.id"
            :highlight="expandedId === s.id"
            :show-actions="true"
            @toggle="id => expandedId = (expandedId === id ? null : id)"
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
</template>
