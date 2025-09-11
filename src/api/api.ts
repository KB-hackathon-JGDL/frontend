import type { MentoringReservationDTO } from '@/types/mentoring';

const API_BASE_URL = '/api';

// JWT 토큰 관리 (추후 실제 토큰 로직으로 교체)
const getAuthToken = (): string => {
  // TODO: 실제 JWT 토큰 로직으로 교체
  return 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwibmFtZSI6IuyCrOyaqeyekDEiLCJ1c2VySWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDEiLCJ1c2VybmFtZSI6InVzZXIxIiwic3ViIjoidXNlcjEiLCJpYXQiOjE3NTc1NTgwODUsImV4cCI6MTc2MTE1ODA4NX0.AImrfKpuqRRQG-xf3oC76DcRTGoe8npUWTMB53CNdZ8';
};

// HTTP 요청 헬퍼
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  // 응답이 비어있을 수 있는 경우 처리
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

// 멘토링 예약 관련 API
export const mentoringApi = {
  // 예약 목록 조회
  getReservations: (): Promise<MentoringReservationDTO[]> => {
    return apiRequest<MentoringReservationDTO[]>('/mentoring-reservations');
  },

  // 특정 예약 조회
  getReservation: (id: string): Promise<MentoringReservationDTO> => {
    return apiRequest<MentoringReservationDTO>(`/mentoring-reservations/${id}`);
  },

  // 예약 생성 (멘토가 스케줄 생성)
  createSchedule: (
    schedules: { mentoringTime: number; mentoringDate: string }[]
  ): Promise<void> => {
    return apiRequest<void>('/mentoring-reservations', {
      method: 'POST',
      body: JSON.stringify(schedules),
    });
  },

  // 예약 신청 (멘티가 예약)
  requestReservation: (
    reservationId: string,
    data: { consultationCard: string; menteeUserId?: string }
  ): Promise<void> => {
    return apiRequest<void>(`/mentoring-reservations/${reservationId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};
