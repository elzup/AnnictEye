// @flow

export type Program = {
  id: number,
  started_at: string,
  is_rebroadcast: boolean,
  channel: Channel,
  work: Work,
  episode: Episode
}

export type Channel = {
  id: number,
  name: string
}

export type Work = {
  id: number,
  title: string,
  title_kana: string,
  media: string,
  media_text: string,
  season_name: string,
  season_name_text: string,
  released_on: string,
  released_on_about: string,
  official_site_url: string,
  wikipedia_url: string,
  twitter_username: string,
  twitter_hashtag: string,
  episodes_count: number,
  watchers_count: number
}

export type Episode = {
  id: number,
  number: number,
  number_text: string,
  sort_number: number,
  title: string,
  records_count: number
}
