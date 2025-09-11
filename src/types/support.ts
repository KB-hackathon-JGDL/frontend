export interface SupportItem {
  id: string
  title: string
  subtitle?: string
  thumbnail: string
  createdAt: string
  tag?: string

  // ↓ 리스트 카드에서 보여줄 선택 필드(있으면 표시)
  org?: string       // 주관/기관
  target?: string    // 대상
  periodStart?: string // 접수 시작 (YYYY-MM-DD)
  periodEnd?: string   // 접수 마감
  announceDate?: string // 발표일
}
