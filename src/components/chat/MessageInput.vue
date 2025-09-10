<script setup lang="ts">
import { ref } from 'vue'
import { SendHorizontal } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  placeholder: string
  isLoading?: boolean
  disabled?: boolean 
}>(), {
  isLoading: false,
  disabled: false, 
})
const emit = defineEmits<{ send: [msg: string] }>()
const inputMessage = ref('')

const sendMessage = () => {
  if (!inputMessage.value.trim() || props.isLoading) return
  emit('send', inputMessage.value.trim())
  inputMessage.value = ''
}
</script>

<template>
  <div class="px-4 pb-12 pt-3 bg-transparent">
    <div class="relative flex items-center gap-3 px-4 h-28 rounded-full bg-white border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      <button
        type="button"
        @click="sendMessage"
        :disabled="!inputMessage.trim() || isLoading || disabled"
        class="absolute right-10 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full
               text-[#7BA7FD] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="메시지 보내기"
      >
        <SendHorizontal :size="24" :stroke-width="2" />
      </button>

      <input
        v-model="inputMessage"
        type="text"
        :placeholder="placeholder"
        :disabled="isLoading || disabled"
        @keypress.enter="sendMessage"
        class="flex-1 pr-16 bg-transparent outline-none text-[17px] placeholder:text-gray-400"
      />
    </div>
  </div>
</template>
