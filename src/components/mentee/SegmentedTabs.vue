<script setup lang="ts">
const model = defineModel<'upcoming' | 'completed'>({ required: true })
</script>

<template>
  <div class="bg-white">
    <div class="flex h-28 border-b border-gray-200">
      <button
        @click="model = 'upcoming'"
        :class="[
          'flex-1 relative grid place-items-center text-[16px] font-semibold',
          model === 'upcoming' ? 'text-blue-600' : 'text-gray-700'
        ]"
      >
        예약된 채팅
        <span
          v-if="model === 'upcoming'"
          class="absolute left-0 right-0 bottom-0 h-[3px] bg-blue-500"
        />
      </button>

      <button
        @click="model = 'completed'"
        :class="[
          'flex-1 relative grid place-items-center text-[16px] font-semibold',
          model === 'completed' ? 'text-blue-600' : 'text-gray-700'
        ]"
      >
        종료된 채팅
        <span
          v-if="model === 'completed'"
          class="absolute left-0 right-0 bottom-0 h-[3px] bg-blue-500"
        />
      </button>
    </div>
  </div>
</template>
