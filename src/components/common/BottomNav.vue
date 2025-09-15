<script setup lang="ts">
import { MessageSquare, ClipboardList, Bot, Landmark, GraduationCap } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route  = useRoute()

const items = [
    { name: '채팅', icon: MessageSquare, to: '/reservations'},
    { name: '커뮤', icon: ClipboardList, to: '/commu'    },
    { name: '봇',   icon: Bot,           to: '/chatbot', center: true },
  { name: '지원정책', icon: Landmark,      to: '/supports' },
  { name: '멘토', icon: GraduationCap, to: '/mentors'    },
]

const isActive = (path: string) => route.path === path
const navigate = (to: string) => router.push(to)
</script>

<template>
  <nav class="bottom-nav fixed bottom-0 left-0 right-0 z-[60] h-[88px] pb-[calc(env(safe-area-inset-bottom,0px))]">
    <div class="relative mx-auto max-w-[430px] h-full">
      <div class="nav-bg pointer-events-none"></div>

      <div class="flex justify-around items-end h-full px-6">
        <template v-for="item in items" :key="item.name">
          <button
            @click="navigate(item.to)"
            :class="[
              'relative flex flex-col items-center justify-center gap-1 pb-11',
              item.center ? '' : ''
            ]"
          >
            <div
              v-if="item.center"
              class="fab absolute left-1/2 -translate-x-1/2 -top-[80px] w-[60px] h-[60px] rounded-full bg-[#6EA4FF] ring-4 ring-white grid place-items-center shadow-lg"
            >
              <component :is="item.icon" class="w-[35px] h-[35px] text-white" />
            </div>

            <template v-else>
              <component
                :is="item.icon"
                class="w-[30px] h-[30px]"
                :class="isActive(item.to) ? 'text-[#6EA4FF]' : 'text-gray-400'"
              />
            </template>
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.bottom-nav{
  --fab-size: 50px;
  --ring: 5px;
  --notch-r: calc(var(--fab-size) / 2 + var(--ring) + 3px);
  --bg: rgba(255,255,255,0.95);
}

.nav-bg{
  position: absolute;
  inset: 0;
  background: var(--bg);
  border-top: 1px solid #e5e7eb;
  backdrop-filter: blur(6px);
  box-shadow: 0 -6px 24px rgba(0,0,0,.06);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

}

</style>
