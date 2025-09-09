<script setup lang="ts">
import type { Mentor } from '@/mocks/mentors'

const props = defineProps<{ mentor: Mentor }>()
const emit  = defineEmits<{ (e:'reserve', id:string): void, (e:'profile', id:string): void }>()

const tagsText = (props.mentor as any).tagsText ?? (props.mentor.badges?.map(b=>`# ${b}`).join(' ') || '')
const orgText  = (props.mentor as any).orgText  ?? props.mentor.title ?? ''
const certText = (props.mentor as any).certText ?? (props.mentor.bio || props.mentor.intro || '')
const headline = (props.mentor as any).headlineText ?? ''
</script>

<template>
<article
  class="w-full h-[150px] bg-white shadow-sm
         grid grid-cols-[64px_1fr] gap-7 p-6 px-8 border-t border-b border-[#E6EAF5]"
>
  <img :src="mentor.photoUrl" class="w-25 h-32 rounded-2xl object-cover ring-1 ring-gray-200" />

  <div class="min-w-0 grid grid-rows-[auto_auto_auto]">
    <div class="flex items-center gap-2 min-w-0">
      <p class="text-[17px] font-semibold truncate">{{ mentor.name }}</p>
<span
  class="ml-auto w-[150px] h-[26px] flex items-center justify-center rounded-full
         text-[13px] font-normal border border-[#427EF6]
         text-[#3A3A3A] bg-[#ffffff] whitespace-nowrap">
  {{ tagsText }}
</span>
    </div>

    <div class="pt-3">
      <p class="text-[15px] text-gray-500 mt-0.5 truncate">{{ orgText }}</p>
      <p class="text-[16px] text-gray-800 leading-[1.35] line-clamp-1">{{ certText }}</p>
    </div>
  </div>

  <div class="col-span-2 -mt-3 flex items-end gap-3">
    <p v-if="headline" class="text-[15px] text-gray-500 truncate">
      {{ headline }}
    </p>
<button
  @click.stop="$router.push({ name: 'mentor-profile', params: { id: mentor.id } })"
  class="ml-auto h-12 px-5 rounded-2xl text-[12px] font-semibold bg-[#FFBD01] text-white hover:brightness-95">
  상담 신청
</button>


  </div>
</article>

</template>
