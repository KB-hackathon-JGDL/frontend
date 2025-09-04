export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  links?: string[];
}

export interface ChatConfig {
  title: string;
  placeholder: string;
  apiEndpoint: string;
  theme: 'blue' | 'green' | 'purple';
  botName: string;
  botAvatar?: string;
  endButtonLabel?: string;
}
