import type { SupportItem } from '@/types/support'

import youthPng from '@/assets/images/supports/2025_youth_stability.png'
import childPng from '@/assets/images/supports/2025_child_program.png'
import ExtensionPng from '@/assets/images/supports/Group 1000012756.png'
import FencePng from '@/assets/images/supports/fence.Png'

export const supportsMock: SupportItem[] = [
  {
    id: 's-2025-ys',
    title: '청년 생활안정 지원사업',
    subtitle: '생활·주거·금융',
    thumbnail: youthPng, 
    createdAt: '2025-09-08T09:00:00Z',
    tag: '신규',
    org: '행안부',
    target: '청년',
    periodStart: '2025-09-01',
    periodEnd: '2025-09-24',
    announceDate: '2025-10-24',
  },
  {
    id: 's-2025-cp',
    title: '보호연장아동 지원사업',
    subtitle: '자립정착금/멘토링/주거',
    thumbnail: childPng,
    createdAt: '2025-09-07T09:00:00Z',
    org: '보건복지부',
    target: '보호연장아동',
    periodStart: '2025-08-02',
    periodEnd: '2025-09-18',
    announceDate: '2025-10-24',
  },
  {
    id: 's-2025-003',
    title: '취업 연계형 교육 바우처',
    subtitle: '교육비 최대 200만원',
    thumbnail: ExtensionPng,
    createdAt: '2025-08-15T09:00:00Z',
    org: '고용노동부',
    target: '미취업 청년',
    periodStart: '2025-08-12',
    periodEnd: '2025-09-12',
    announceDate: '2025-09-20',
  },
{
  id: 's-2025-ut',
  title: '자립준비청년 울타리 대출사업',
  subtitle: '금융 대출(두 번째 기회)',
  thumbnail: FencePng,
  createdAt: '2025-01-01T09:00:00Z',
  org: '사회연대은행',
  target: '보호종료 5년 경과한 23~34세 자립준비청년',
  periodStart: '2025-01-01',
  periodEnd: '2099-12-31',
  announceDate: '상시',
  tag: '대출',
}
]
