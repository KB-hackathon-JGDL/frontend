export type ChoiceKey = 'A' | 'B' | 'C'

export interface Option {
  key: ChoiceKey
  label: string
  score: number
}

export interface Question {
  id: number
  title: string
  caption?: string
  options: Option[]
}
