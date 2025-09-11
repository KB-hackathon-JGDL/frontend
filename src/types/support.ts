export interface SupportItem {
  id: string
  title: string
  subtitle?: string
  thumbnail: string
  createdAt: string
  tag?: string

  org?: string   
  target?: string    
  periodStart?: string 
  periodEnd?: string 
  announceDate?: string 
}
