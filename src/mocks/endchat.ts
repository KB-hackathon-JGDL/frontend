// src/mocks/completedSessions.ts
import hyejungImg from '@/assets/images/mentee/hyejung.png'

export default [
  {
    id: 'C-1001',
    mentee: { 
      id: 'U-01', 
      name: '황혜정 (19세)', 
      photoUrl: hyejungImg
    },
    turnCurrent: 3,
    datetime: new Date('2025-09-20T11:00:00').toISOString(),
    status: 'completed',
    card: {
      context: '종료된 상담입니다.',
    },
  },
]
