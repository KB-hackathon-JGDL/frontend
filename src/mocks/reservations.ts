import type { MentoringReservationDTO } from '@/types/mentoring'

const reservationsMock: MentoringReservationDTO[] = [
  {
    mentoringReservationId: 'R-001',
    mentorUserId: 'M-01',
    name: '김범로',
    photoUrl:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop',
    mentoringDate: '2025-09-20',
    mentoringTime: 14,
    chatStatus: 'PENDING',
    consultationCard: '은행업무와 대출 관련 상담을 받고 싶어요.',
  },
  {
    mentoringReservationId: 'R-002',
    mentorUserId: 'M-02',
    name: '박지원',
    photoUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    mentoringDate: '2025-09-22',
    mentoringTime: 16,
    chatStatus: 'ACTIVE',
    consultationCard: '이직 준비 중입니다. 포트폴리오 피드백 요청.',
  },
  {
    mentoringReservationId: 'R-003',
    mentorUserId: 'M-03',
    name: '장블루',
    photoUrl: 'https://i.pravatar.cc/120?img=13',
    mentoringDate: '2025-09-05',
    mentoringTime: 20,
    chatStatus: 'COMPLETED',
    consultationCard: '면접 대비 상담 완료.',
  },
]

export default reservationsMock
