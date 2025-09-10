<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  active?: boolean
}>(), { active: false })

const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <button
    @click="emit('click')"
    class="h-14 px-5 rounded-full border text-[14px] transition
           hover:bg-gray-50"
    :class="props.active
      ? 'border-[#4A79F6] text-[#4A79F6] bg-[#EAF0FF]'
      : 'border-gray-200 text-gray-700 bg-white'"
  >
    # {{ props.label }}
  </button>
</template>
