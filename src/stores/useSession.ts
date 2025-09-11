// src/stores/useSession.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
  Session,
  MentoringReservationDTO,
  ChatStatus,
} from '@/types/mentoring';
import { mentoringApi } from '@/api/api';
import mockSessions from '@/mocks/sessions';

export const useSessionStore = defineStore('session', () => {
  const sessions = ref<Session[]>([]);
  const reservations = ref<MentoringReservationDTO[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // 기존 computed들
  const upcoming = computed(() =>
    sessions.value
      .filter((s) => s.status === 'scheduled')
      .sort((a, b) => +new Date(a.datetime) - +new Date(b.datetime))
  );

  const completed = computed(() =>
    sessions.value
      .filter((s) => s.status === 'completed')
      .sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime))
  );

  // 백엔드 예약 데이터를 Session 형태로 변환
  const upcomingReservations = computed(() =>
    reservations.value
      .filter((r) => r.chatStatus === 'PENDING' || r.chatStatus === 'ACTIVE')
      .map(reservationToSession)
      .sort((a, b) => +new Date(a.datetime) - +new Date(b.datetime))
  );

  const completedReservations = computed(() =>
    reservations.value
      .filter((r) => r.chatStatus === 'COMPLETED')
      .map(reservationToSession)
      .sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime))
  );

  // DTO를 Session으로 변환하는 헬퍼 함수
  function reservationToSession(reservation: MentoringReservationDTO): Session {
    console.log('Converting reservation:', reservation);

    let datetime: string;

    try {
      // 날짜와 시간을 조합하여 ISO 문자열 생성
      const dateStr = reservation.mentoringDate;
      const timeNum = reservation.mentoringTime;

      console.log('Date string:', dateStr, 'Time number:', timeNum);

      // 입력값 검증
      if (!dateStr || timeNum === undefined || timeNum === null) {
        console.error('Invalid date or time:', { dateStr, timeNum });
        // 기본값으로 현재 시간 사용
        datetime = new Date().toISOString();
      } else {
        // 시간을 2자리 문자열로 변환 (예: 14 -> "14", 9 -> "09")
        const timeStr = String(timeNum).padStart(2, '0');

        // ISO 형식으로 조합 (한국 시간대 고려)
        const combinedStr = `${dateStr}T${timeStr}:00:00`;
        console.log('Combined string:', combinedStr);

        const dateObj = new Date(combinedStr);

        // 유효한 날짜인지 확인
        if (isNaN(dateObj.getTime())) {
          console.error('Invalid date created:', combinedStr);
          datetime = new Date().toISOString();
        } else {
          datetime = dateObj.toISOString();
        }
      }

      console.log('Final datetime:', datetime);
    } catch (error) {
      console.error('Error converting date/time:', error);
      datetime = new Date().toISOString();
    }

    return {
      id: reservation.mentoringReservationId,
      mentor: {
        id: reservation.mentorUserId,
        name: '상담사 ' + reservation.name, // TODO: 멘토 정보 API로 가져오기
        photoUrl: 'https://placehold.co/64x64?text=M',
      },
      turnCurrent: 1, // TODO: 실제 회차 정보
      datetime,
      status: chatStatusToSessionStatus(reservation.chatStatus),
      card: reservation.consultationCard
        ? {
            context: reservation.consultationCard,
          }
        : undefined,
    };
  }

  // ChatStatus를 SessionStatus로 변환
  function chatStatusToSessionStatus(
    chatStatus: ChatStatus
  ): 'scheduled' | 'completed' | 'canceled' {
    switch (chatStatus) {
      case 'PENDING':
      case 'ACTIVE':
        return 'scheduled';
      case 'COMPLETED':
        return 'completed';
      default:
        return 'canceled';
    }
  }

  // 백엔드에서 예약 목록 조회
  async function fetchReservations() {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await mentoringApi.getReservations();
      reservations.value = data;
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : '예약 목록을 불러오는데 실패했습니다.';
      console.error('Failed to fetch reservations:', err);
    } finally {
      isLoading.value = false;
    }
  }

  // 특정 예약 조회
  async function fetchReservation(id: string) {
    if (!id || id.trim() === '') {
      throw new Error('예약 ID가 필요합니다.');
    }

    try {
      const reservation = await mentoringApi.getReservation(id);
      // 기존 목록에서 업데이트 또는 추가
      const index = reservations.value.findIndex(
        (r) => r.mentoringReservationId === id
      );
      if (index >= 0) {
        reservations.value[index] = reservation;
      } else {
        reservations.value.push(reservation);
      }
      return reservation;
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : '예약 정보를 불러오는데 실패했습니다.';
      throw err;
    }
  }

  // 기존 Mock 함수들 (하위 호환성)
  async function fetchMySessions() {
    isLoading.value = true;
    try {
      const res = await fetch('/api/sessions?role=mentee');
      sessions.value = (await res.json()) as Session[];
    } finally {
      isLoading.value = false;
    }
  }

  function loadMock() {
    sessions.value = mockSessions as unknown as Session[];
  }

  function getById(id: string) {
    // 먼저 실제 예약에서 찾기
    const reservation = reservations.value.find(
      (r) => r.mentoringReservationId === id
    );
    if (reservation) {
      return reservationToSession(reservation);
    }
    // 없으면 Mock 세션에서 찾기
    return sessions.value.find((s) => s.id === id);
  }

  function completeSession(id: string) {
    // Mock 세션 업데이트
    const s = sessions.value.find((s) => s.id === id);
    if (s && s.status !== 'completed') {
      s.status = 'completed';
    }

    // 실제 예약은 API 호출로 처리해야 함 - 로컬에서 임의 변경하지 않음
    // TODO: 백엔드 API 호출로 상태 업데이트
    // await mentoringApi.updateReservationStatus(id, 'COMPLETED')
  }

  function cleanupSessions(retentionDays = 60) {
    const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
    sessions.value = sessions.value.filter((s) => {
      if (s.status === 'scheduled') return true;
      const end = new Date(s.datetime).getTime() + 60 * 60000;
      return end >= cutoff;
    });
  }

  // 새로운 예약 생성 (로컬 Mock)
  function createReservationLocal(
    mentor: { id: string; name: string; photoUrl?: string },
    datetime: string
  ) {
    const newSession: Session = {
      id: `session-${Date.now()}`,
      mentor,
      turnCurrent: 1,
      datetime,
      status: 'scheduled',
    };
    sessions.value.push(newSession);
    return newSession.id;
  }

  return {
    // State
    sessions,
    reservations,
    isLoading,
    error,

    // Computed - Mock 데이터
    upcoming,
    completed,

    // Computed - 실제 백엔드 데이터
    upcomingReservations,
    completedReservations,

    // Actions - 백엔드 API
    fetchReservations,
    fetchReservation,

    // Actions - Mock (하위 호환성)
    fetchMySessions,
    loadMock,
    getById,
    completeSession,
    cleanupSessions,
    createReservationLocal,
  };
});
