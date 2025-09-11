import busanmanImg from '@/assets/images/mentor/busanman.png'
import chuImg from '@/assets/images/mentee/chu.png'

export default [
  {
    id: 'S-1001',
    mentor: { id: 'M-01', name: '상담사 김철호', photoUrl: busanmanImg },
    mentee: { id: 'U-01', name: '주영우', photoUrl: chuImg },
    turnCurrent: 1,
    datetime: new Date().toISOString(),
    status: 'scheduled',
  }
]
