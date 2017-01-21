// @flow

export type Program = {
  id: number,
  work: Work,
  episode: Episode
}

export type Work = {
  id: number,
  title: string,
  episodes_count: number,
  watchers_count: number,
  records_count: number
}

export type Episode = {
  id: number,
  number: number,
  number_text: string,
  records_count: number
}
