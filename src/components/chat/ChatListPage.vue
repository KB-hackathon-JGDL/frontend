<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import SessionCard from '@/components/mentee/SessionCard.vue'
import EndedSessionCard from '@/components/chat/EndedSessionCard.vue'
import type { Session } from '@/types/mentoring'

const sessions = ref<Session[]>([
])

const tab = ref<'scheduled' | 'ended'>('scheduled')

const scheduledList = computed(() =>
  sessions.value.filter(s => String(s.status).toLowerCase() === 'scheduled')
)
const endedList = computed(() =>
  sessions.value.filter(s => String(s.status).toLowerCase() !== 'scheduled')
)

const expandedId = ref<string | null>(null)
watch(tab, () => { expandedId.value = null })
</script>

<template>
  <div class="px-4 pt-5 pb-20 max-w-screen-sm mx-auto">
    <div class="flex gap-3 mb-3">
      <button
        @click="tab='scheduled'"
        :class="[
          'h-10 px-4 rounded-full text-[14px] font-semibold border',
          tab==='scheduled' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-200'
        ]"
      >예약된 채팅</button>
      <button
        @click="tab='ended'"
        :class="[
          'h-10 px-4 rounded-full text-[14px] font-semibold border',
          tab==='ended' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-200'
        ]"
      >종료된 채팅</button>
    </div>

    <p v-if="tab==='ended'" class="text-[12px] text-gray-500 mb-3">
      * 종료된 채팅은 90일까지 보관됩니다.
    </p>

    <div class="space-y-3">
      <template v-if="tab==='scheduled'">
        <SessionCard
          v-for="s in scheduledList"
          :key="s.id"
          :session="s"
          :expanded="expandedId === s.id"
          :highlight="expandedId === s.id"
          :show-actions="true"
          @toggle="(id) => expandedId = (expandedId === id ? null : id)"
        />
        <div v-if="scheduledList.length===0" class="text-center text-gray-500 py-8 text-sm">
          예약된 채팅이 없습니다.
        </div>
      </template>

      <template v-else>
        <EndedSessionCard v-for="s in endedList" :key="s.id" :session="s" />
        <div v-if="endedList.length===0" class="text-center text-gray-500 py-8 text-sm">
          종료된 채팅이 없습니다.
        </div>
      </template>
    </div>
  </div>
</template>
