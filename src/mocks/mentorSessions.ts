import chuImg from '@/assets/images/mentee/chu.png'
import hyejungImg from '@/assets/images/mentee/hyejung.png'
import karinaImg from '@/assets/images/mentee/karina.png'

export default [
  {
    id: 'MS-1001',
    mentee: { id: 'U-01', name: '박현민 (19세)', photoUrl: chuImg },
    turnCurrent: 3,
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
    status: 'scheduled',
    card: {
      goal: '수시 면접 준비',
      context: '자기소개 피드백',
      questions: ['면접 예상 질문', 'PT면접 팁'],
    },
  },
  {
    id: 'MS-1002',
    mentee: { id: 'U-02', name: '주영우 (17세)', photoUrl: hyejungImg },
    turnCurrent: 1,
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    status: 'scheduled',
  },
  {
    id: 'MS-0907',
    mentee: { id: 'U-03', name: '장블루 (23세)', photoUrl: karinaImg },
    turnCurrent: 4,
    datetime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    status: 'completed',
  },
] as const
