<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useSupportStore } from '@/stores/useSupport';
import { ChevronLeft } from 'lucide-vue-next';
import { Ticket, MapPin, Calendar, User } from 'lucide-vue-next';
import DetailYouthPng from '@/assets/images/supports/detail_youth.png';
import BottomNav from '@/components/common/BottomNav.vue'

const route = useRoute();
const router = useRouter();
const store = useSupportStore();
store.loadMock();

const id = computed(() => String(route.params.id));
const item = computed(() => store.items.find((s) => s.id === id.value));

const detailThumbnail = computed(() => {
  if (!item.value) return '';
  if (item.value.id === 's-2025-ys') return DetailYouthPng;
  return item.value.thumbnail;
});

const openApplyUrl = () => {
  const url =
    'https://change.beautifulfund.org/12569/2025-청년생활안정지원사업2025-9-10-접수-마감/';
  window.open(url, '_blank');
};
</script>

<template>
  <div class="min-h-dvh bg-[#ffffff]">
    <header class="h-[85px] bg-[#578FFD] text-white px-5 pt-7">
      <div class="flex items-center gap-2">
        <button
          class="w-12 h-12 rounded-full mt-4 grid place-items-center"
          @click="router.back()"
        >
          <ChevronLeft :size="25" />
        </button>
        <h1 class="text-[23px] font-semibold mt-4 ml-5">지원사업</h1>
      </div>
    </header>

    <main class="p-0 h-[]">
      <div v-if="item" class="bg-[#ffffff] h-[808px] p-0 shadow">
        <img
          :src="detailThumbnail"
          alt=""
          class="w-full h-[230px] object-contain rounded-lg my-14"
        />

        <section class="px-5 py-4 space-y-3 mt-5 -ml-1 text-[14px]">
          <h3
            class="text-[20px] font-semibold text-[#4A79F6] mb-10 -mt-10 ml-24"
          >
            Detail
          </h3>

          <div class="relative -ml-4 w-[430px] h-[3px]">
            <div class="absolute inset-0 bg-[#E1E1E1] rounded-full"></div>
            <div
              class="absolute inset-y-0 left-0 w-[215px] bg-[#4A79F6] rounded-full z-10"
            ></div>
          </div>

          <div class="mt-5">
            <section class="px-5 py-4">
              <div class="flex items-start gap-2 text-gray-700">
                <Ticket class="w-8 h-8 mt-[2px] text-gray-700 shrink-0" />
                <span>아름다운재단 · 청년지갑트레이닝센터</span>
              </div>

              <div
                class="mt-2 flex items-center text-gray-700 divide-x divide-gray-700"
              >
                <div class="flex items-center gap-2 pr-3">
                  <MapPin class="w-8 h-8 mt-[2px] text-gray-700 shrink-0" />
                  <span>전국</span>
                </div>
                <div class="flex items-center gap-2 pl-3">
                  <Calendar class="w-8 h-8 mt-[2px] text-gray-700 shrink-0" />
                  <span>{{ item.periodStart }} - {{ item.periodEnd }}</span>
                </div>
              </div>

              <div class="mt-2 flex items-start gap-2 text-gray-700">
                <User class="w-8 h-8 mt-[2px] text-gray-700 shrink-0" />
                <span class="mt-1"
                  >아동양육시설 및 가정위탁 보호 종료 만18세~34세
                  자립준비청년</span
                >
              </div>

              <div class="mt-5">
                <h4 class="text-[15px] font-semibold text-gray-800 mb-1 mt-5">
                  지원내용
                </h4>
                <ul class="list-disc pl-5 text-gray-700 space-y-1 ml-10">
                  <li>생활안정자금</li>
                  <li>긴급지원금</li>
                  <li>1:1 재무관리 상담</li>
                </ul>
              </div>

              <div class="mt-4">
                <h4 class="text-[15px] font-semibold text-gray-800 mb-1 mt-5">
                  신청서류
                </h4>
                <ul class="list-disc pl-5 text-gray-700 space-y-1 ml-10">
                  <li>지원신청서</li>
                  <li>보호종료확인서</li>
                  <li>저소득/기준중위소득 확인 서류</li>
                </ul>
              </div>

              <div class="mt-4">
                <h4 class="text-[15px] font-semibold text-gray-800 mb-1 mt-5">
                  신청방법
                </h4>
                <p class="text-gray-700 ml-10">
                  온라인 신청서 작성 및 서류 제출 (포스터 QR 또는 링크)
                </p>
              </div>
            </section>

            <div class="mt-10 flex justify-center gap-12 px-5 pb-5">
              <button
                class="px-4 py-2 rounded-[12px] bg-white text-[15px] h-[50px] w-[130px] border-[2px] border-[#7BA7FD]"
                @click="router.push('/home')"
              >
                홈으로 돌아가기
              </button>
              <button
                class="px-4 py-2 rounded-[12px] bg-[#4A79F6] text-white text-[15px] h-[50px] w-[130px]"
                @click="openApplyUrl"
              >
                지금 신청하기
              </button>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="text-center text-gray-500 py-20">
        항목을 찾을 수 없습니다.
      </div>
    </main>
  </div>
<BottomNav />
</template>
