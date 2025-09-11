<script setup lang="ts">
const props = defineProps<{ open: boolean }>()
const emit  = defineEmits<{ close: []; goHome: []; goNext: [] }>()
</script>

<template>
  <Teleport to="body">
    <div v-if="props.open" class="fixed inset-0 z-[300]">
      <div class="absolute inset-0 bg-black/40" @click="emit('close')" />

      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
               w-[320px] h-[170px] rounded-2xl bg-white p-5 shadow-xl"
      >
        <p class="text-[15px] text-gray-800 font-medium mb-10 mt-10 text-center">
          키워드 제출이 완료되었습니다.<br />이용해주셔서 감사합니다!
        </p>

        <div class="flex justify-center gap-5 text-[15px]">
          <button
            class="w-[130px] h-16 rounded-xl border border-[#7BA7FD] hover:bg-gray-50 text-[#3B63E6]"
            @click="emit('goHome')"
          >
            홈으로 돌아가기
          </button>
          <button
            class="w-[130px] h-16 rounded-xl bg-[#4A79F6] text-white hover:opacity-90"
            @click="emit('goNext')"
          >
            다음 상담 예약하기
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
