export type Program = {
  id: number,
  work: Work,
  episode: Episode
}

export type Work = {
  id: number,
  title: string,
  episodes: number
}

export type Episode = {
  id: number,
  nubmer: number,
  nubmer_text: string,
  records_count: number
}
