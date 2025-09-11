<script setup lang="ts">
import { useSupportStore } from '@/stores/useSupport';
import SupportListItem from '@/components/supports/SupportListItem.vue';
import { Bell, User2, ChevronLeft } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const store = useSupportStore();
store.loadMock();

const router = useRouter();
</script>

<template>
  <div class="min-h-dvh bg-[#F4F6FE]">
    <header class="h-[88px] bg-[#578FFD] text-white px-5 pt-7">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button
            class="w-12 h-12 rounded-full mt-4 grid place-items-center"
            @click="router.back()"
          >
            <ChevronLeft :size="25" />
          </button>
          <h1 class="text-[23px] font-semibold mt-4 ml-5">지원사업</h1>
        </div>
        <div class="flex items-center gap-5 mr-8 mt-4">
          <Bell :size="24" class="opacity-90" />
          <User2 :size="24" class="opacity-90" />
        </div>
      </div>
    </header>

    <main class="px-5 py-3 space-y-4 h-[900px] bg-[#ffffff]">
      <SupportListItem v-for="it in store.items" :key="it.id" :item="it" />
    </main>
  </div>
</template>
