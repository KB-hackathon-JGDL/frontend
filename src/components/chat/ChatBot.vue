<script setup lang="ts">
import { useRouter } from 'vue-router'
import ChatContainer from '@/components/chat/ChatContainer.vue'
import type { ChatConfig } from '@/types/chat'

const router = useRouter()

const chatConfig: ChatConfig = {
  title: 'ChatBot',
  placeholder: '메세지를 입력하세요',
  apiEndpoint: '/api/chat',
  theme: 'blue',
  botName: 'ChatBot',
  endButtonLabel: '상담 종료'
}

const handleBack = () => router.back()
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <ChatContainer :config="chatConfig" @back="handleBack"/>
  </div>
</template>
