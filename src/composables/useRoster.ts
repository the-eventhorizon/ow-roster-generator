import { ref, type Ref } from 'vue'
import type { Player, Hero } from '../types/hero'

interface UseRosterReturn {
  teamName: Ref<string>
  date: Ref<string>
  roles: Ref<string[]>
  players: Ref<Player[]>
  addPlayer: () => void
    removePlayer: (index: number) => void
    dropHero: (playerIndex: number, role: string, hero: Hero) => void
    removeHero: (playerIndex: number, role: string, heroIndex: number) => void
}

export function useRoster(): UseRosterReturn {
  const teamName = ref<string>('NEUES OW TEAM')
  const date = ref<string>('20.10.2025')
  const roles = ref<string[]>([
    'TANK',
    'HITSCAN DPS',
    'HYBRID DPS',
    'FLEX DPS',
    'MAIN SUPPORT',
    'HYBRID SUPPORT',
    'FLEX SUPPORT'
  ])

  const players = ref<Player[]>([
    { name: 'Spieler1', heroes: {} },
    { name: 'Spieler2', heroes: {} },
    { name: 'Spieler3', heroes: {} },
    { name: 'Spieler4', heroes: {} },
    { name: 'Spieler5', heroes: {} }
  ])

  const addPlayer = (): void => {
    players.value.push({
      name: `Spieler${players.value.length + 1}`,
      heroes: {}
    })
  }

  const removePlayer = (index: number): void => {
    players.value.splice(index, 1)
  }

  const dropHero = (playerIndex: number, role: string, hero: Hero): void => {
    if (!hero) return

    if (!players.value[playerIndex]!.heroes[role]) {
      players.value[playerIndex]!.heroes[role] = []
    }

    if (players.value[playerIndex]!.heroes[role]!.some(h => h.key === hero.key)) {
      return
    }
    if(!role.includes("HYBRID")) {
      if (players.value[playerIndex]!.heroes[role].length < 3) {
        players.value[playerIndex]!.heroes[role].push(hero)
      }
    } else {
      if(players.value[playerIndex]!.heroes[role].length < 2) {
        players.value[playerIndex]!.heroes[role].push(hero)
      }
    }
  }

  const removeHero = (playerIndex: number, role: string, heroIndex: number): void => {
    players.value[playerIndex]!.heroes[role]!.splice(heroIndex, 1)
  }

  return {
    teamName,
    date,
    roles,
    players,
    addPlayer,
    removePlayer,
    dropHero,
    removeHero
  }
}
