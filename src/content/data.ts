export interface Episode {
    rating: number
    index: number
    title: string
    url: string
    votes: string
    airDate: string
}

export interface Season {
    number: number
    episodes: Episode[]
}