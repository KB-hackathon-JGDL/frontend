<script setup lang="ts">
const props = defineProps<{
  label: string
  selected?: boolean
}>()
const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button
    class="block mx-auto mt-10 w-[320px] h-[56px] rounded-full border transition grid place-items-center
           text-[15px] font-medium"
    :class="[
      selected
        ? 'border-[#7BA7FD] text-[#4A79F6] bg-[#F6F9FF]'
        : 'border-gray-400 text-gray-700 hover:border-gray-300'
    ]"
    @click="emit('click')"
  >
    {{ label }}
  </button>
</template>
