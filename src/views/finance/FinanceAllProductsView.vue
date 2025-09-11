<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, Star } from 'lucide-vue-next'

type Rate = { min: number; max: number; asOf?: string }
type Product = { id: string; bank: 'KB'|'HANA'|'SHINHAN'|'WOORI'; title: string; rate?: Rate }

const bankLogoMap: Record<string, string> = {
  KB:      new URL('@/assets/images/bank/kb.png',     import.meta.url).href,
  HANA:    new URL('@/assets/images/bank/hana.png',   import.meta.url).href,
  SHINHAN: new URL('@/assets/images/bank/sinhan.png', import.meta.url).href,
  WOORI:   new URL('@/assets/images/bank/woori.png',  import.meta.url).href,
}

const router = useRouter()

const activeTab = ref<'product' | 'card'>('product')

const list = ref<Product[]>([
  { id: 'kb-special',  bank: 'KB',     title: 'KB 특★한 적금',   rate: { min: 2.0,  max: 6.0 } },
  { id: 'kb-myway',    bank: 'KB',     title: 'KB 내맘대로 적금', rate: { min: 2.3,  max: 3.55 } },
  { id: 'kb-clearsky', bank: 'KB',     title: 'KB 맑은하늘 적금', rate: { min: 2.45, max: 3.85 } },
  { id: 'woori-won',   bank: 'WOORI',  title: '우리은행 WON플러스예금', rate: { min: 2.4, max: 2.45 } },
  { id: 'shinhan-reg', bank: 'SHINHAN',title: '신한은행 쓸만한 정기예금', rate: { min: 1.8, max: 2.45 } },
  { id: 'hana-reg',    bank: 'HANA',   title: '하나은행 하나의정기예금', rate: { min: 1.8, max: 2.45 } },
])

const fav = ref<Set<string>>(new Set(JSON.parse(localStorage.getItem('favProducts') || '[]')))
const toggleFav = (id: string) => {
  fav.value.has(id) ? fav.value.delete(id) : fav.value.add(id)
  localStorage.setItem('favProducts', JSON.stringify([...fav.value]))
}

const goDetail = (id: string) =>
  router.push({ name: 'finance-product-detail', params: { id } })
</script>

<template>
  <div class="mx-auto w-[430px] min-h-[932px] bg-[#F4F6FE]">
    <header class="h-[85px] bg-[#578FFD] text-white px-5 pt-11">
      <div class="flex items-center gap-2">
        <button class="w-10 h-10 rounded-full grid place-items-center" @click="router.back()">
          <ChevronLeft :size="25" />
        </button>
        <h1 class="text-[23px] font-semibold ml-3">금융상품</h1>
      </div>
    </header>

    <main class="p-4 bg-[#ffffff]">
      <div class="relative mt-4 px-2 mb-[10px]">
        <div class="flex">
          <button
            class="w-1/2 py-2 mb-5 text-[15px] font-medium transition-colors"
            :class="activeTab === 'product' ? 'text-[#4A79F6]' : 'text-gray-400'"
            @click="activeTab = 'product'"
          >금융상품 추천</button>
          <button
            class="w-1/2 py-2 mb-5 text-[15px] font-medium transition-colors"
            :class="activeTab === 'card' ? 'text-[#4A79F6]' : 'text-gray-400'"
            @click="activeTab = 'card'"
          >카드 추천</button>
        </div>
        <div class="absolute left-0 right-0 bottom-0 h-px bg-gray-200"></div>
        <div
          class="absolute bottom-0 h-[2px] bg-[#4A79F6] w-1/2 transition-all duration-300"
          :class="activeTab === 'product' ? 'left-0' : 'left-1/2'"
        ></div>
      </div>

      <div
        v-for="p in list"
        :key="p.id"
        class="h-[90px] w-[370px] mx-auto mt-[30px] mb-[30px] flex items-center justify-between bg-[#F0F6FF] rounded-[16px] shadow-sm px-4 py-3 cursor-pointer"
        @click="goDetail(p.id)"
      >
        <div class="flex items-center gap-3">
          <div class="w-[50px] h-[50px] grid place-items-center rounded-full overflow-hidden">
            <img :src="bankLogoMap[p.bank]" alt="" class="w-[35px] h-[35px] object-contain" />
          </div>
          <div>
            <div class="text-[15px] font-medium text-gray-900">{{ p.title }}</div>
            <div class="text-[13px] text-gray-500">
              이율 :
              <template v-if="p.rate">
                {{ p.rate.min.toFixed(2) }}% ~ {{ p.rate.max.toFixed(2) }}%
                <span v-if="p.rate.asOf"> ({{ p.rate.asOf }} 기준)</span>
              </template>
              <template v-else>제공 예정</template>
            </div>
          </div>
        </div>

        <button class="w-10 h-10 grid place-items-center" @click.stop="toggleFav(p.id)">
          <Star :size="20" :class="fav.has(p.id) ? 'text-[#FFC727] fill-[#FFC727]' : 'text-gray-600'" />
        </button>
      </div>
    </main>
  </div>
</template>
