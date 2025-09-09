// src/mocks/mentors.ts

export interface Mentor {
  id: string
  name: string
  photoUrl: string

  /** 카드에 그대로 뿌릴 텍스트들 */
  category: string            // ex) '대출/금융 상담'
  tagsText: string            // ex) '# 상냥한 # 유머있는'
  orgText: string             // ex) '여의도 펀드회사 근무'
  certText: string            // ex) '투자자산운용사, 신용분석사 보유'
  headlineText: string        // ex) '“복잡한 은행업무, 대출 관련 상담 환영해요”'
}

export type Availability = Record<string, string[]>  // 'YYYY-MM-DD' -> ['10:00','10:30',...]

export const mentors: Mentor[] = [
  {
    id: 'M-01',
    name: '상담사 김범로',
    photoUrl: 'https://i.pravatar.cc/120?img=11',
    category: '대출/금융 상담',
    tagsText: '# 상냥한 # 유머있는',
    orgText: '여의도 펀드회사 근무',
    certText: '투자자산운용사, 신용분석사 보유',
    headlineText: '“복잡한 은행업무, 대출 관련 상담 환영해요”',
  },
  {
    id: 'M-02',
    name: '상담사 박지원',
    photoUrl: 'https://i.pravatar.cc/120?img=12',
    category: '진로/이직',
    tagsText: '# 이직 멘토 # IT출신',
    orgText: 'KB은행 근무',
    certText: '경력 코치/직무 멘토링 수료',
    headlineText: '“커리어 로드맵 설계와 포트폴리오 피드백”',
  },
  {
    id: 'M-03',
    name: '상담사 장블루',
    photoUrl: 'https://i.pravatar.cc/120?img=13',
    category: '면접/포트폴리오',
    tagsText: '# 면접관 # 포폴 리뷰',
    orgText: '전직 현업 면접관',
    certText: '면접관 양성과정/프레젠테이션 코칭',
    headlineText: '“면접/포트폴리오에 강점이 있어요.”',
  },
]

// 상담가별 가능 시간 (예시)
export const availability: Record<string, Availability> = {
  'M-01': {
    '2025-09-08': ['10:00', '11:00', '13:00', '14:00', '18:00'],
    '2025-09-09': ['10:00', '10:30', '11:00', '17:30', '19:00'],
  },
  'M-02': {
    '2025-09-08': ['09:30', '10:00', '15:00', '16:00', '20:00'],
  },
  'M-03': {
    '2025-09-10': ['10:00', '11:30', '13:30', '18:30', '21:00'],
  },
}
