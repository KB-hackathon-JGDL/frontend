// src/mocks/reservationsMock.ts
import type { MentoringReservationDTO } from '@/types/mentoring'

const reservationsMock: MentoringReservationDTO[] = [
  {
    mentoringReservationId: 'R-001',
    mentorUserId: 'M-01',
    name: '박은빈 (19세)',
    photoUrl:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop', // ✅ 예쁜 프로필 이미지
    mentoringDate: '2025-09-20',
    mentoringTime: 11,
    chatStatus: 'PENDING',
    consultationCard:
      '최근 저희의 용기만큼 자금 관리가 원활하지 않아 많은 어려움을 겪고 있습니다. 안정적인 생활을 이어가기 위해 대출과 자산 운영에 대한 도움이 절실합니다. 제 상황을 이해해주시고 실질적으로 도움이 될 방향을 찾아주시면 큰 힘이 될 것 같습니다.',
    turnCurrent: 3,
  },
]

export default reservationsMock
