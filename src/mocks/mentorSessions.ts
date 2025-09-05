// 멘토 입장에서 "신청한 멘티" 세션들
export default [
  {
    id: 'MS-1001',
    mentee: { id: 'U-01', name: '박현민 (19세)', photoUrl: 'https://i.pravatar.cc/64?img=12' },
    turnCurrent: 3,
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2일 후
    status: 'scheduled',
    card: {
      goal: '수시 면접 준비',
      context: '자기소개 피드백',
      questions: ['면접 예상 질문', 'PT면접 팁']
    }
  },
  {
    id: 'MS-1002',
    mentee: { id: 'U-02', name: '주영우 (17세)', photoUrl: 'https://i.pravatar.cc/64?img=31' },
    turnCurrent: 1,
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7일 후
    status: 'scheduled'
  },
  {
    id: 'MS-0907',
    mentee: { id: 'U-03', name: '장블루 (23세)', photoUrl: 'https://i.pravatar.cc/64?img=5' },
    turnCurrent: 4,
    datetime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5일 전
    status: 'completed'
  }
] as const
