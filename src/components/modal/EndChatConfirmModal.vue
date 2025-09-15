<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function goToCompleted() {
  router.push('/reservations')
}

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: []; confirm: [] }>()
</script>

<template>
  <Teleport to="body">
    <div v-if="props.open" class="fixed inset-0 z-[100]">
      <div class="absolute inset-0 bg-black/40" @click="emit('close')" />
      <div
        class="absolute left-1/2 top-1/2 w-[320px] h-[150px] -translate-x-1/2 -translate-y-1/2
               rounded-2xl bg-white p-5 shadow-xl"
      >
        <p class="text-[15px] text-gray-800 font-medium mb-10 mt-10 text-center">
          채팅을 종료할까요?
        </p>

        <div class="flex justify-center gap-5 text-[15px]">
          <button
            class="w-[120px] h-16 rounded-xl border border-[#7BA7FD] hover:bg-gray-50"
            @click="emit('close')"
          >
            채팅으로 돌아가기
          </button>
<RouterLink
  :to="{ path: '/reservations', query: { tab: 'completed' } }"
  class="w-[120px] h-16 rounded-xl bg-[#4A79F6] text-white hover:opacity-90 flex items-center justify-center"
>
  종료하기
</RouterLink>



        </div>
      </div>
    </div>
  </Teleport>
</template>
