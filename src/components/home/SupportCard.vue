<script setup lang="ts">
import type { SupportItem } from '@/types/support'
const props = defineProps<{ item: SupportItem }>()
</script>

<template>
  <div class="w-[180px] mx-auto">
    <div class="rounded-2xl overflow-hidden">
      <img
        :src="item.thumbnail"
        class="block h-[180px] w-full object-cover"  
        alt=""
      />
    </div>
    <p class="mt-2 mb-5 text-[14px] text-center font-regualer leading-snug line-clamp-2 text-gray-900">
      {{ item.title }}
    </p>
  </div>
</template>

