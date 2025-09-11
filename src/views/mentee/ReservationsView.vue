<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import SegmentedTabs from '@/components/mentee/SegmentedTabs.vue';
import SessionCard from '@/components/mentee/SessionCard.vue';
import EndedSessionCard from '@/components/chat/EndedSessionCard.vue';
import { useSessionStore } from '@/stores/useSession';

import MentorSessionCard from '@/components/memtor/MentorSessionCard.vue';
import MentorEndedSessionCard from '@/components/memtor/MentorEndedSessionCard.vue';

import mentorSessions from '@/mocks/mentorSessions';

const route = useRoute();
const isMentor = computed(() => String(route.query.role ?? '') === 'mentor');

const tab = ref<'upcoming' | 'completed'>('upcoming');
watch(isMentor, () => {
  tab.value = 'upcoming';
});

const store = useSessionStore();

onMounted(async () => {
  // 실제 백엔드 API로 예약 목록 조회
  await store.fetchReservations();

  // Mock 데이터도 로드 (하위 호환성)
  if (!store.sessions.length) {
    store.loadMock?.();
  }
});

// 멘티용 - 실제 백엔드 데이터 사용 (프론트에서 상태별 분류)
const menteeUpcoming = computed(() => {
  try {
    const result = store.upcomingReservations;
    console.log('Upcoming reservations result:', result);
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('Error in menteeUpcoming:', error);
    return [];
  }
});

const menteeCompleted = computed(() => {
  try {
    const result = store.completedReservations;
    console.log('Completed reservations result:', result);
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('Error in menteeCompleted:', error);
    return [];
  }
});

// 멘토용 - Mock 데이터 (기존 로직 유지)
type MentorSession = (typeof mentorSessions)[number];
const mentorAll = ref<MentorSession[]>(mentorSessions as any);

if (!mentorAll.value?.length) {
  mentorAll.value = [
    {
      id: 'MS-9991',
      mentee: { id: 'U-x1', name: '테스트 멘티', photoUrl: '' },
      turnCurrent: 1,
      datetime: new Date(Date.now() + 86400000).toISOString(),
      status: 'scheduled',
    },
    {
      id: 'MS-9992',
      mentee: { id: 'U-x2', name: '예전 멘티', photoUrl: '' },
      turnCurrent: 2,
      datetime: new Date(Date.now() - 86400000 * 3).toISOString(),
      status: 'completed',
    },
  ] as any;
}

const mentorUpcoming = computed(() =>
  mentorAll.value.filter((s) => String(s.status).toLowerCase() === 'scheduled')
);
const mentorCompleted = computed(() =>
  mentorAll.value.filter((s) => String(s.status).toLowerCase() !== 'scheduled')
);

const expandedId = ref<string | null>(null);
watch(tab, () => {
  expandedId.value = null;
});

// 에러 처리 및 재시도
const retryFetch = async () => {
  await store.fetchReservations();
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="sticky top-0 z-10 bg-[#4A79F6] text-white shadow">
      <div class="h-[85px] px-4 flex items-center">
        <h1 class="text-[18px] font-semibold">
          예약/종료된 상담
          <span v-if="isMentor" class="opacity-80 text-sm">(멘토)</span>
        </h1>
      </div>
    </header>

    <div class="bg-white border-b">
      <SegmentedTabs v-model="tab" />
    </div>

    <!-- 로딩 상태 -->
    <div v-if="store.isLoading" class="flex justify-center items-center py-10">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A79F6]"
      ></div>
      <span class="ml-2 text-gray-600">예약 목록을 불러오는 중...</span>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="store.error" class="px-4 py-6">
      <div
        class="bg-red-50 border border-red-200 rounded-xl p-4 max-w-screen-sm mx-auto"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <h3 class="text-sm font-medium text-red-800">
              오류가 발생했습니다
            </h3>
            <p class="mt-1 text-sm text-red-700">{{ store.error }}</p>
          </div>
        </div>
        <div class="mt-4">
          <button
            @click="retryFetch"
            class="w-full bg-red-100 border border-red-300 rounded-lg px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            다시 시도
          </button>
        </div>
      </div>
    </div>

    <!-- 정상 상태 -->
    <main v-else class="px-4 py-3 space-y-3 max-w-screen-sm mx-auto w-full">
      <template v-if="!isMentor">
        <template v-if="tab === 'upcoming'">
          <SessionCard
            v-for="s in menteeUpcoming"
            :key="s.id"
            :session="s"
            :expanded="expandedId === s.id"
            :highlight="expandedId === s.id"
            :show-actions="true"
            @toggle="(id) => (expandedId = expandedId === id ? null : id)"
          />
          <div
            v-if="!menteeUpcoming.length"
            class="text-center text-sm text-gray-500 py-10"
          >
            <p>예약된 상담이 없습니다.</p>
            <button
              @click="retryFetch"
              class="mt-2 text-[#4A79F6] hover:underline text-xs"
            >
              새로고침
            </button>
          </div>
        </template>
        <template v-else>
          <EndedSessionCard
            v-for="s in menteeCompleted"
            :key="s.id"
            :session="s"
          />
          <div
            v-if="!menteeCompleted.length"
            class="text-center text-sm text-gray-500 py-10"
          >
            <p>종료된 상담이 없습니다.</p>
            <button
              @click="retryFetch"
              class="mt-2 text-[#4A79F6] hover:underline text-xs"
            >
              새로고침
            </button>
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
          <p
            v-if="!mentorUpcoming.length"
            class="text-center text-sm text-gray-500 py-10"
          >
            예약된 상담이 없습니다.
          </p>
        </template>
        <template v-else>
          <MentorEndedSessionCard
            v-for="s in mentorCompleted"
            :key="s.id"
            :session="s"
          />
          <p
            v-if="!mentorCompleted.length"
            class="text-center text-sm text-gray-500 py-10"
          >
            종료된 상담이 없습니다.
          </p>
        </template>
      </template>
    </main>
  </div>
</template>
