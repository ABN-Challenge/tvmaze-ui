export interface ShowImage {
  medium?: string | null
  original?: string | null
}

export interface ShowRating {
  average?: number | null
}

export interface ShowCardModel {
  id: number
  name: string
  image?: ShowImage | null
  rating?: ShowRating | null
  genres?: string[]
  premiered?: string | null
  status?: string | null
  summary?: string | null
  officialSite?: string | null
  network?: { name?: string | null } | null
  webChannel?: { name?: string | null } | null
}
