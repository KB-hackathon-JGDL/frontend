<script setup lang="ts">
import { ref } from 'vue'
import { User2, Lock, EyeOff } from 'lucide-vue-next'
import logoImg from '@/assets/images/logo/logo.png'
import handImg from '@/assets/images/logo/hand.png'
import kakaoLogo from '@/assets/images/social/kakao.png'
import googleLogo from '@/assets/images/social/google.png'

const id = ref('')
const pw = ref('')

function onSubmit(e: Event) {
  e.preventDefault()
}
</script>

<template>
  <div class="min-h-dvh grid place-items-center bg-[#578FFD]">
    <div class="relative w-[430px] h-[932px] shadow-2xl overflow-hidden bg-[#578FFD] text-white">
      <div class="px-10 pt-16">
        <div class="flex items-center gap-3">
          <img :src="logoImg" alt="" class="h-[120px] w-[120px] ml-[60px] mt-[130px] select-none" draggable="false" />
          <img :src="handImg" alt="" class="h-[120px] w-[120px] mt-[130px] select-none" draggable="false" />
        </div>
      </div>

      <form @submit="onSubmit" class="px-10 pt-10 mt-[40px]">
        <div class="space-y-3">
          <div class="relative">
            <input
              v-model="id"
              type="text"
              placeholder="아이디를 입력하세요"
              class="block mx-auto h-[50px] w-[310px] pl-[50px] pr-[40px] rounded-lg bg-white text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-white/40"
            />
            <User2 :size="18" class="absolute left-20 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div class="relative">
            <input
              v-model="pw"
              type="password"
              placeholder="비밀번호를 입력하세요"
              class="block mx-auto h-[50px] w-[310px] pl-[50px] pr-[40px] mt-[20px] rounded-lg bg-white text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-white/40"
            />
            <Lock :size="18" class="absolute left-20 top-1/2 -translate-y-1/2 text-gray-400" />
            <EyeOff :size="18" class="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          class="block mx-auto h-[50px] w-[310px] mt-[50px] rounded-xl bg-[#FFC727] text-white text-[15px] font-bold tracking-wide shadow-md active:scale-[0.99]"
        >
          LOGIN
        </button>

        <div class="mt-10 text-center text-white/90 text-[15px]">
          <span class="underline underline-offset-2 cursor-pointer">회원 가입</span>
          <span class="mx-2">|</span>
          <span class="underline underline-offset-2 cursor-pointer">아이디 / 비밀번호 찾기</span>
        </div>
      </form>

      <div class="mb-[30px] absolute left-10 right-10 bottom-[50px]">
        <div class="flex items-center gap-4">
          <div class="mb-[20px] h-px flex-1 bg-white/40"></div>
          <span class="mb-[20px] text-white text-[15px]">간편 로그인</span>
          <div class="mb-[20px] h-px flex-1 bg-white/40"></div>
        </div>

        <div class="mb-[10px] flex items-center justify-center gap-10">
          <div class="w-20 h-20 rounded-full grid place-items-center shadow">
            <img :src="kakaoLogo" alt="" class="w-[40px] h-[40px] object-contain" />
          </div>
          <div class="w-20 h-20 rounded-full grid place-items-center shadow">
            <img :src="googleLogo" alt="" class="w-[40px] h-[40px] object-contain" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
