<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'   // [ref 추가]
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/useSession'
import { useChatStore } from '@/stores/useChat'
import ChatHeader from '@/components/chat/ChatHeader.vue'
import MessageItem from '@/components/chat/MessageItem.vue'
import MessageInput from '@/components/chat/MessageInput.vue'
import EndChatConfirmModal from '@/components/modal/EndChatConfirmModal.vue'   // [추가]
import type { ChatConfig, ChatMessage } from '@/types/chat'

const props = withDefaults(defineProps<{
  sessionId?: string
  role?: 'mentee' | 'mentor'
  readonly?: boolean
}>(), {
  role: undefined,
  readonly: false,
})

const route = useRoute()
const router = useRouter()
const sid = String(props.sessionId ?? route.params.sessionId ?? '')

const sessionStore = useSessionStore()
const chatStore = useChatStore()
let stopSync: null | (() => void) = null

onMounted(() => {
  if (!sessionStore.sessions.length) sessionStore.loadMock?.()
  chatStore.loadHistory(sid)
  chatStore.cleanupAll?.()
  sessionStore.cleanupSessions?.()
  stopSync = chatStore.startSync?.(sid) || null
})
onBeforeUnmount(() => stopSync?.())

// ✅ role 해석: props > query > route.name > 기본 mentee
const currentRole = computed<'mentee' | 'mentor'>(() => {
  if (props.role) return props.role
  const q = String(route.query.role || '')
  if (q === 'mentor' || q === 'mentee') return q as any
  const rn = String(route.name || '')
  if (rn.includes('mentor')) return 'mentor'
  return 'mentee'
})

const session = computed(() => sessionStore.getById?.(sid) ?? null)

// 상대 표시
const peerName = computed(() =>
  currentRole.value === 'mentor'
    ? (session.value?.mentee?.name ?? '멘티')
    : (session.value?.mentor?.name ?? '상담사')
)
const peerAvatar = computed(() =>
  currentRole.value === 'mentor'
    ? (session.value?.mentee?.photoUrl ?? '')
    : (session.value?.mentor?.photoUrl ?? '')
)

const readonlyByStatus = computed(() => session.value?.status !== 'scheduled')
const readonly = computed(() => props.readonly || readonlyByStatus.value)

const messageList = computed<ChatMessage[]>(() => {
  const arr = chatStore.messages(sid)?.value
  if (!Array.isArray(arr)) return []
  return arr.filter((m: any) => m && typeof m.id === 'string' && typeof m.content === 'string')
})

const config = computed<ChatConfig>(() => ({
  title: peerName.value,
  placeholder: currentRole.value === 'mentee' ? '멘티로 작성…' : '멘토로 작성…',
  apiEndpoint: '/api/chat',
  theme: 'blue',
  botName: peerName.value,
  botAvatar: peerAvatar.value,
}))

function onSend(text: string) {
  if (readonly.value) return
  chatStore.sendLocal(sid, text, currentRole.value)
}

// ====== 여기부터 모달 로직 추가 ======
const showEndModal = ref(false)

function openEndConfirm() {            // 헤더 @end가 호출
  if (!session.value || session.value.status === 'completed') return
  showEndModal.value = true
}
function closeEndConfirm() {           // 모달: 채팅으로 돌아가기
  showEndModal.value = false
}
function confirmEnd() {                // 모달: 종료하기
  const s = session.value
  if (!s || s.status === 'completed') return

  // 세션 완료 처리 + 시스템 메시지
  sessionStore.completeSession?.(s.id)
  chatStore.addSystem?.(sid, '상담이 종료되었습니다. 채팅방은 읽기 전용으로 전환됩니다.')

  showEndModal.value = false

  // 리뷰 페이지로 이동
  router.push({ name: 'ReviewKeywordsView', params: { mentorId: s.mentor?.id ?? 'M-01' } })
}
// =====================================

function formatDateLabel(ts: string) {
  const d = new Date(ts)
  const w = ['일','월','화','수','목','금','토'][d.getDay()]
  return `${d.getMonth()+1}월 ${d.getDate()}일 ${w}요일`
}

type MixedItem =
  | { type: 'date'; id: string; label: string }
  | { type: 'msg'; id: string; m: ChatMessage }

const items = computed<MixedItem[]>(() => {
  const list = [...(messageList.value ?? [])].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )

  const out: MixedItem[] = []
  let lastKey = ''

  for (const m of list) {
    const key = new Date(m.timestamp).toISOString().slice(0, 10)
    if (key !== lastKey) {
      out.push({ type: 'date', id: 'd-' + key, label: formatDateLabel(m.timestamp) })
      lastKey = key
    }
    out.push({ type: 'msg', id: m.id || crypto.randomUUID(), m })
  }
  return out
})
</script>

<template>
  <div v-if="session" class="mx-auto bg-white ring-1 ring-gray-200 shadow flex flex-col !w-[430px] !h-[932px]">
    <!-- [변경] 헤더 end 이벤트는 모달 오픈 -->
    <ChatHeader :config="config" @back="router.back()" @end="openEndConfirm" />

    <div class="flex-1 overflow-y-auto px-4 pt-6 pb-3">
      <template v-for="it in items" :key="it.id">
        <div v-if="it.type === 'date'" class="my-3">
          <div class="flex items-center gap-3">
            <span class="flex-1"></span>
            <span class="text-[13px] text-gray-500">{{ it.label }}</span>
            <span class="flex-1"></span>
          </div>
        </div>

        <MessageItem
          v-else
          :message="it.m"
          :avatar-url="peerAvatar"
          :role="currentRole"
          :peer-name="peerName"
          :show-time="true"
        />
      </template>
    </div>

    <div v-if="readonly" class="px-4 py-3 text-center text-[12px] text-gray-700 bg-gray-50 border-t border-gray-200">
      상담이 종료되었습니다.
    </div>

    <MessageInput :placeholder="config.placeholder" :disabled="readonly" @send="onSend" />

    <!-- [추가] 종료 확인 모달 -->
    <EndChatConfirmModal :open="showEndModal" @close="closeEndConfirm" @confirm="confirmEnd" />
  </div>

  <div v-else class="mx-auto bg-white ring-1 ring-gray-200 shadow flex flex-col !w-[430px] !h-[932px]">
    <ChatHeader :config="config" @back="router.back()" />
    <div class="flex-1 grid place-items-center text-sm text-gray-600 px-6">
      세션 정보를 불러오는 중입니다.
    </div>
  </div>
</template>
