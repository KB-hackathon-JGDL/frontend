<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, Shield, TrendingUp } from 'lucide-vue-next'
import type { ProductDetail } from '@/services/finance'
import { fetchProductDetail } from '@/services/finance'

const bankLogoMap: Record<string, string> = {
  KB:      new URL('@/assets/images/bank/kb.png',     import.meta.url).href,
  HANA:    new URL('@/assets/images/bank/hana.png',   import.meta.url).href,
  SHINHAN: new URL('@/assets/images/bank/sinhan.png', import.meta.url).href,
  WOORI:   new URL('@/assets/images/bank/woori.png',  import.meta.url).href,
}
const bankLabelMap: Record<string, string> = {
  KB: '국민은행', HANA: '하나은행', SHINHAN: '신한은행', WOORI: '우리은행'
}

const defaultFeatures = [
  '월별 납입 금액에 따라 우대금리 제공',
  '자동이체 신청 시 추가 혜택',
  '만기 해지 시 이자 자동 입금'
]

const route = useRoute()
const router = useRouter()

const detail = ref<ProductDetail | null>(null)
const loading = ref(true)
const id = computed(() => String(route.params.id ?? ''))

onMounted(async () => {
  loading.value = true
  try {
    detail.value = await fetchProductDetail(id.value)
  } finally {
    loading.value = false
  }
})

type BadgeKey = 'bank' | 'rate' | 'deposit'

const baseBadges = computed(() => {
  if (!detail.value) return []
  const items: Array<{ key: BadgeKey; icon: BadgeKey; text: string; logo?: string | null }> = [
    {
      key: 'bank',
      icon: 'bank',
      text: bankLabelMap[detail.value.bank] ?? detail.value.bank,
      logo: bankLogoMap[detail.value.bank] ?? null,
    },
  ]
  if (detail.value.rate?.max != null) {
    items.push({
      key: 'rate',
      icon: 'rate',
      text: `최고 ${detail.value.rate.max.toFixed(1)}%`,
    })
  }
  if (detail.value.protected) {
    items.push({ key: 'deposit', icon: 'deposit', text: '예금자보호' })
  }
  return items
})

const visibleKeys = ref<BadgeKey[]>(['bank', 'rate', 'deposit'])
const order = ref<BadgeKey[]>(['bank', 'rate', 'deposit'])

const textOverrides = ref<Partial<Record<BadgeKey, string>>>({})

const classByKey: Record<BadgeKey, string> = {
  bank: 'bg-[#F1F4FF] text-[#334155]',
  rate: 'bg-[#FFF7ED] text-[#9A3412]',
  deposit: 'bg-[#ECFEFF] text-[#0E7490]',
}

const badges = computed(() =>
  baseBadges.value
    .filter(b => visibleKeys.value.includes(b.key))
    .sort((a, b) => order.value.indexOf(a.key) - order.value.indexOf(b.key))
    .map(b => ({
      ...b,
      text: textOverrides.value[b.key] ?? b.text,
      cls: classByKey[b.key] ?? '',
    }))
)

const applyNow = () => {
  if (detail.value?.applyUrl) {
    window.open(detail.value.applyUrl, '_blank')
  }
}
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

    <main class="px-0 -mt-4">
      <div class="mt-4 bg-white h-[840px] overflow-hidden">
        <div class="px-5 pt-5 pb-3">
          <div class="flex items-start gap-3">
            <div class="w-20 h-20 rounded-full flex items-center justify-center shrink-0">
              <span class="text-[40px] ml-[100px] mt-[55px]">✨</span>
            </div>
            <div class="min-w-0">
              <h2 class="text-[30px] ml-[60px] mt-[30px] font-bold text-gray-900 truncate">
                {{ detail?.title || '로딩 중…' }}
              </h2>
              <p class="mt-1 text-[14px] mt-[15px] -ml-[30px] text-gray-500">
                {{ detail?.summary || '더 높은 금리, 더 특별한 혜택으로 여러분의 미래를 함께 준비합니다.' }}
              </p>
            </div>
          </div>

          <div class="mt-3 ml-10 mt-[50px] mb-[20px] flex flex-wrap items-center gap-[30px]">
            <div
              v-for="b in badges"
              :key="b.key"
              class="h-[100px] w-[100px] rounded-[10px] text-[#3B4B8C] text-[12px] font-medium ring-1 ring-[#E5EDFF] p-2 flex flex-col items-center justify-between"
              :class="b.cls"
            >
              <div class="w-full flex items-center justify-center mt-[20px]">
                <template v-if="b.icon === 'bank'">
                  <img
                    :src="b.logo || bankLogoMap.KB"
                    :alt="detail?.bank || 'bank'"
                    class="w-full max-w-[76px] h-[32px] object-contain"
                  />
                </template>
                <template v-else-if="b.icon === 'rate'">
                  <div class="w-10 h-10 mr-[15px] rounded-full grid place-items-center">
                    <TrendingUp :size="40" />
                  </div>
                </template>
                <template v-else>
                  <div class="w-10 h-10 mr-[15px] rounded-full grid place-items-center">
                    <Shield :size="40" />
                  </div>
                </template>
              </div>
              <span class="leading-tight text-center">
                {{ b.text }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-2 px-5">
          <div class="relative border-b border-gray-200">
  <button
    class="relative px-[80px] pb-2 -ml-[10px] text-[20px] font-semibold text-[#4A79F6]
           after:content-[''] after:absolute after:left-0 after:bottom-[-1px]
           after:h-px after:w-[215px] after:bg-[#4A79F6]"
  >
    Detail
  </button>
</div>
</div>

        <div class="px-5 py-4">
          <h3 class="text-[16px] font-regular text-gray-800 mb-[30px] mt-[30px]">특별한 적금의 특별한 혜택</h3>
          <ul class="text-[16px] font-regular text-gray-700 leading-6 list-disc mt-[10px] ml-[30px] mb-[50px] space-y-3">
            <li v-for="(f, i) in (detail?.features ?? defaultFeatures)" :key="i">{{ f }}</li>
          </ul>
          <p v-if="detail?.footnote" class="text-[14px] text-gray-700 mt-10 font-regular mb-[50px]">
            {{ detail.footnote }}
          </p>
        </div>

        <div class="px-5 pt-1 pb-5 flex items-center justify-center gap-20">
          <button
            class="h-[60px] w-[120px] px-4 rounded-[12px] bg-white text-gray-700 text-[14px] ring-1 ring-[#7BA7FD]"
            @click="router.push('/home')"
          >
            홈으로 돌아가기
          </button>
          <button
            class="h-[60px] w-[120px] px-4 rounded-[12px] bg-[#4A79F6] text-white text-[14px]"
            :disabled="!detail?.applyUrl"
            @click="applyNow"
          >
            지금 신청하기
          </button>
        </div>
      </div>
    </main>

    <div v-if="loading" class="text-center text-gray-400 text-[12px] py-4">불러오는 중…</div>
  </div>
</template>
