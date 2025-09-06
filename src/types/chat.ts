export interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'bot' | 'system'   
  timestamp: string                   
}

export interface ChatConfig {
  title: string
  placeholder: string
  apiEndpoint: string
  theme: 'blue' | 'green' | 'purple'
  botName: string
  botAvatar?: string
  endButtonLabel?: string
}
