// 간단 목 데이터 (멘티 입장에서 보는 예약들)
export default [
  {
    id: 'S-1001',
    mentor: { id: 'M-01', name: '상담사 김철호', photoUrl: 'https://i.pravatar.cc/64?img=12' },
    turnCurrent: 3,
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2일 후
    status: 'scheduled',
    card: {
      goal: '면접 대비 피드백 받기',
      context: '최근 포트폴리오 업데이트 사항 공유 필요',
      questions: ['기술 면접에서 약점 보완 방법?', '코드 리뷰 어필 포인트?']
    }
  },
  {
    id: 'S-1002',
    mentor: { id: 'M-02', name: '상담사 임별림', photoUrl: 'https://i.pravatar.cc/64?img=32' },
    turnCurrent: 1,
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7일 후
    status: 'scheduled'
  },
  {
    id: 'S-0907',
    mentor: { id: 'M-03', name: '상담사 장블루', photoUrl: 'https://i.pravatar.cc/64?img=5' },
    turnCurrent: 4,
    datetime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5일 전
    status: 'completed',
    card: {
      goal: '커리어 로드맵 점검',
      context: '6개월 내 이직 계획',
      questions: ['로드맵 현실성 체크', '부족 역량 채우는 순서']
    }
  }
] as const
