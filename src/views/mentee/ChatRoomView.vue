<script setup lang="ts">
import { computed, ref, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import ChatHeader from '@/components/chat/ChatHeader.vue'
import MessageItem from '@/components/chat/MessageItem.vue'
import MessageInput from '@/components/chat/MessageInput.vue'
import type { ChatConfig } from '@/types/chat'

const route = useRoute()
const router = useRouter()
const sid = String(route.params.sessionId ?? '')

const sessionStore = useSessionStore()
onMounted(() => { if (!sessionStore.sessions.length) sessionStore.loadMock() })

const session = computed(() => sessionStore.getById?.(sid))
const mentorName   = computed(() => session.value?.mentor.name ?? '상담사')
const mentorAvatar = computed(() => session.value?.mentor.photoUrl ?? '') // ✅

const config = computed<ChatConfig>(() => ({
  title: mentorName.value,
  placeholder: '메세지를 입력하세요',
  apiEndpoint: '/api/mentee/chat',
  theme: 'blue',
  botName: mentorName.value,
  botAvatar: mentorAvatar.value, // ✅ 헤더로 전달
}))
</script>

<template>
  <div class="mx-auto bg-white ring-1 ring-gray-200 shadow flex flex-col !w-[430px] !h-[932px]">
    <ChatHeader :config="config" @back="router.back()" />

    <div class="flex-1 overflow-y-auto px-4 pb-3">
      <MessageItem
        v-for="m in []"
        :key="m.id"
        :message="m"
        :avatar-url="mentorAvatar"  
      />
    </div>

    <MessageInput :placeholder="config.placeholder" @send="() => {}" />
  </div>
</template>
