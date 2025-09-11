<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSurveyStore } from '@/stores/useSurvey';
import type { Product } from '@/stores/useSurvey';
import kb from '@/assets/images/bank/kb.png';
import hana from '@/assets/images/bank/hana.png';
import sinhan from '@/assets/images/bank/sinhan.png';
import woori from '@/assets/images/bank/woori.png';

const productId = (p: Product) =>
  (p as any).id ?? p.title.replace(/\s+/g, '-').toLowerCase();
const router = useRouter();
const store = useSurveyStore();

onMounted(() => {
  store.hydrateFromStorage?.();
});

const startSurvey = () => {
  router.push({ name: 'survey', params: { step: 1 } });
};
const goAll = () => router.push({ name: 'finance-all' });

const activeTab = ref<'product' | 'card'>('product');

const showListProducts = computed(
  () =>
    !!store.persona &&
    store.recommendedProducts &&
    store.recommendedProducts.length > 0
);
const fallbackProducts: Product[] = [
  { title: 'KB 특★한 적금', rate: { min: 2.0, max: 6.0 } },
  { title: 'KB 내맘대로 적금', rate: { min: 2.3, max: 3.55 } },
  { title: 'KB 맑은하늘 적금', rate: { min: 2.45, max: 3.85 } },
];
const listProducts = computed(() =>
  showListProducts.value ? store.recommendedProducts : fallbackProducts
);

type CardItem = { title: string; benefit: string; img: string };
const cardList = ref<CardItem[]>([
  { title: 'KB국민 톡톡카드', benefit: '편의점/배달 10% 적립', img: kb },
  { title: '신한 Deep Dream', benefit: '생활영역 0.7~5% 적립', img: sinhan },
  { title: '우리카드 오늘', benefit: '교통/통신 할인', img: woori },
]);
</script>

<template>
  <section class="relative z-[10] -mt-[45px] ml-5">
    <div
      class="w-[430px] h-[567px] mx-auto -translate-x-5 mt-10 rounded-t-[30px] bg-[#ECF0F3] p-4 pt-10 ring-1 ring-black/5 shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
    >
      <div class="flex items-center justify-between mb-5 pr-3">
        <h2 class="text-[16px] font-semibold text-gray-800 ml-3">
          금융상품 추천
        </h2>
        <button
          class="text-[15px] text-[#000000] flex items-center gap-1 hover:underline mr-[10px]"
          @click="goAll"
          aria-label="금융상품 전체보기"
        >
          전체보기
        </button>
      </div>

      <div class="relative mt-2 px-2">
        <div class="flex">
          <button
            class="w-1/2 py-2 text-[14px] font-medium transition-colors"
            :class="
              activeTab === 'product' ? 'text-[#4A79F6]' : 'text-gray-400'
            "
            @click="activeTab = 'product'"
          >
            금융상품 추천
          </button>
          <button
            class="w-1/2 py-2 text-[14px] font-medium transition-colors"
            :class="activeTab === 'card' ? 'text-[#4A79F6]' : 'text-gray-400'"
            @click="activeTab = 'card'"
          >
            카드 추천
          </button>
        </div>
        <div
          class="absolute mt-10 -mb-5 left-0 right-0 bottom-0 h-px bg-gray-200"
        ></div>
        <div
          class="absolute bottom-0 -mb-5 h-[2px] bg-[#4A79F6] w-1/2 transition-all duration-300"
          :class="activeTab === 'product' ? 'left-0' : 'left-1/2'"
        ></div>
      </div>

      <template v-if="activeTab === 'product'">
        <template v-if="showListProducts">
          <div class="grid gap-6 mt-12">
            <div
              v-for="p in listProducts"
              :key="p.title"
              class="w-[350px] h-[80px] mt-[5px] text-left rounded-[40px] bg-white p-4 ml-10 mb-[10px] ring-1 ring-gray-100 shadow-[0_6px_16px_rgba(0,0,0,0.06)] flex items-center justify-between"
            >
              <div class="ml-2 flex items-center gap-5">
                <div
                  class="w-[40px] h-[40px] rounded-full bg-[#FFFFFF] grid place-items-center overflow-hidden"
                >
                  <img
                    :src="kb"
                    alt=""
                    class="w-[35px] h-[35px] object-contain"
                  />
                </div>
                <div>
                  <p class="text-[15px] font-medium text-gray-800">
                    {{ p.title }}
                  </p>
                  <p class="text-[12px] text-gray-400 mt-2">
                    이율 :
                    <template v-if="p.rate">
                      {{ p.rate.min.toFixed(2) }}% ~
                      {{ p.rate.max.toFixed(2) }}%
                      <span v-if="p.rate.asOf"> ({{ p.rate.asOf }} 기준)</span>
                    </template>
                    <template v-else>이율 정보 없음</template>
                  </p>
                </div>
              </div>
              <RouterLink
                :to="{
                  name: 'finance-product-detail',
                  params: { id: productId(p) },
                }"
                class="w-14 h-14 rounded-full bg-[#FFC727] grid place-items-center mr-4"
                aria-label="상세 보기"
              >
                <ChevronRight :size="25" class="text-white" />
              </RouterLink>
            </div>
          </div>
        </template>

        <template v-else>
          <button
            class="w-[350px] h-[120px] text-left rounded-[40px] bg-white p-4 ml-10 mt-10 ring-1 ring-gray-100 shadow-[0_6px_16px_rgba(0,0,0,0.06)] flex items-center justify-between"
            @click="startSurvey"
          >
            <div class="ml-8">
              <p class="text-[14px] text-gray-400 mt-0 mb-5">
                아직 설문을 진행하지 않으셨어요!
              </p>
              <p class="text-[15px] font-medium text-gray-800">
                설문조사를 진행하고<br />나에게 맞는 금융상품을 알아봐요!
              </p>
            </div>
            <span
              class="w-14 h-14 rounded-full bg-[#FFC727] grid place-items-center mr-4"
            >
              <ChevronRight :size="25" class="text-[#ffffff]" />
            </span>
          </button>
        </template>
      </template>

      <template v-else>
        <div class="grid gap-6 mt-6 mt-[30px]">
          <div
            v-for="c in cardList"
            :key="c.title"
            class="w-[350px] h-[80px] mt-[5px] text-left rounded-[40px] bg-white p-4 ml-10 mb-[10px] ring-1 ring-gray-100 shadow-[0_6px_16px_rgba(0,0,0,0.06)] flex items-center justify-between"
          >
            <div class="ml-2 flex items-center gap-5">
              <div
                class="w-[40px] h-[40px] rounded-full bg-[#FFFFFF] grid place-items-center overflow-hidden"
              >
                <img
                  :src="c.img"
                  alt=""
                  class="w-[35px] h-[35px] object-contain"
                />
              </div>
              <div>
                <p class="text-[15px] font-medium text-gray-800">
                  {{ c.title }}
                </p>
                <p class="text-[12px] text-gray-400 mt-2">{{ c.benefit }}</p>
              </div>
            </div>
            <span
              class="w-14 h-14 rounded-full bg-[#FFC727] grid place-items-center mr-4"
            >
              <ChevronRight :size="25" class="text-white" />
            </span>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
