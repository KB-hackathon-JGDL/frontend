export type Rate = { min: number; max: number; asOf?: string }
export type ProductDetail = {
  id: string
  bank: 'KB' | 'HANA' | 'SHINHAN' | 'WOORI' | string
  title: string
  summary?: string
  protected?: boolean      
  rate?: Rate
  features?: string[]
  footnote?: string
  applyUrl?: string        
}

export async function fetchProductDetail(id: string): Promise<ProductDetail> {
  const fallback: ProductDetail = {
    id: 'kb-special',
    bank: 'KB',
    title: 'KB 특별한적금',
    summary: '더 높은 금리, 더 특별한 혜택으로 여러분의 미래를 함께 준비합니다.',
    protected: true,
    rate: { min: 2.0, max: 6.0, asOf: '2025-01-15' },
    features: [
      '저축금액: 월 1만원 ~ 30만원 (1만원 단위)',
      '이율: 2% ~ 6%',
      '우대조건: 최대 4.0%p',
      '급여이체/자동이체/카드 이용 등 실적 우대',
      '비대면 가입 가능',
    ],
    footnote: '* 예/적금은 가입일로부터 다음달 가입일 전일까지 이자율이 적용됩니다.',
    applyUrl: 'https://bank.example.com/apply/kb-special',
  }

  await new Promise(r => setTimeout(r, 200)) // UX용 지연
  return fallback
}
