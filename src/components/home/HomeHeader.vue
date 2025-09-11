<script setup lang="ts">
import { Bell, User2, Circle } from 'lucide-vue-next'
import HandPng from '@/assets/images/header/hand.png'
import NamePng from '@/assets/images/header/name.png'
</script>

<template>
  <header class="h-[88px] bg-[#578FFD] text-white px-7 pt-6 shadow-lg">
    <div class="flex items-center justify-between">
     <div class="flex items-center gap-1 ml-3">
        <img :src="NamePng" alt="Jamancu" class="h-24 w-auto select-none" />
        <img :src="HandPng" alt="Jamancu mark" class="h-24 w-auto select-none" />
      </div>

      <div class="flex items-center gap-5 mt-1 mr-5">
        <Bell :size="28" class="opacity-90" />
        <span class="relative grid place-items-center w-9 h-9">
          <Circle :size="34" class="absolute" :stroke-width="1" />
          <User2 :size="20" class="relative" />
        </span>
      </div>
    </div>
  </header>
</template>
