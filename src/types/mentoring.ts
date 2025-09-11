// src/types/mentoring.ts (기존 파일에 추가)

export type SessionStatus = 'scheduled' | 'completed' | 'canceled';
export type ChatStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED';

export interface Mentor {
  id: string;
  name: string;
  photoUrl?: string;
  company?: string;
  role?: string;
  certifications?: string[];
  tags?: string[];
  tagline?: string;
}

export interface Session {
  id: string;
  mentor: Mentor;
  turnCurrent: number;
  datetime: string; // ISO
  status: SessionStatus;
  card?: {
    goal?: string;
    context?: string;
    questions?: string[];
  };
}

// 백엔드 DTO와 매핑되는 타입들
export interface MentoringReservationDTO {
  mentoringReservationId: string;
  mentorUserId: string;
  menteeUserId?: string;
  mentoringTime: number; // 소문자로 수정
  mentoringDate: string; // 소문자로 수정 (YYYY-MM-DD)
  consultationCard?: string;
  chatStatus: ChatStatus;
  name: string; // 상대방 이름 필드 추가
}

export interface MentoringReservationCreateDTO {
  mentoringTime: number; // 소문자로 수정
  mentoringDate: string; // 소문자로 수정
}

export interface MentoringReservationRequestDTO {
  consultationCard: string;
  menteeUserId?: string;
}
