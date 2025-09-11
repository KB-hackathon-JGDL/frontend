<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{ show: boolean }>()
const emit  = defineEmits<{ (e:'close'): void; (e:'goHome'): void }>()

const router = useRouter()

function goHome() {
  emit('goHome')
  router.push('/home')
}
</script>


<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 z-[60] grid place-items-center bg-black/50 backdrop-blur-[2px]"
        role="dialog" aria-modal="true"
        @click.self="emit('close')"
      >
        <transition name="pop">
          <div class="w-[85%] max-w-[420px] rounded-2xl bg-white shadow-xl overflow-hidden">
            <div class="px-6 pt-14 pb-2">
              <h3 class="w-full text-center text-[20px] font-regualer text-gray-900">
                저장 완료 되었습니다!
              </h3>
            </div>

            <div v-if="$slots.default" class="px-6 py-3">
              <slot />
            </div>

            <div class="px-6 pt-8 pb-14 flex justify-center">
              <slot name="actions">
                <button
                  class="h-20 px-20 rounded-lg bg-[#7BA7FD] text-white text-[14px] font-semibold hover:brightness-95"
                  @click="goHome"
                >
                  확인
                </button>
              </slot>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .18s ease}
.fade-enter-from,.fade-leave-to{opacity:0}
.pop-enter-active,.pop-leave-active{transition:transform .18s ease,opacity .18s ease}
.pop-enter-from,.pop-leave-to{transform:scale(.97);opacity:0}
</style>
