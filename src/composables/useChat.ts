import { ref, type Ref } from 'vue'
import type { ChatMessage, ChatConfig } from '@/types/chat'

export function useChat(config: ChatConfig) {
  const messages: Ref<ChatMessage[]> = ref([])
  const isLoading = ref(false)

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    }
    messages.value.push(userMessage)

    isLoading.value = true
    try {
      const response = await fetch(config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      })
      
      const data = await response.json()
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
        links: data.links
      }
      messages.value.push(botMessage)
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      isLoading.value = false
    }
  }

  const clearMessages = () => {
    messages.value = []
  }

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  }
}