export interface Hero {
  key: string
  name: string
  portrait: string
  role: 'tank' | 'damage' | 'support'
}

export interface HeroesByRole {
  tank: Hero[]
  damage: Hero[]
  support: Hero[]
}

export interface Player {
  name: string
  heroes: Record<string, Hero[]>
}
