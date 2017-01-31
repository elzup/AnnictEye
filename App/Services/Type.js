'use strict'

/* eslint camelcase: 0 */
export class Program {
	constructor(obj) {
		this.id = obj.id
		this.started_at = obj.started_at
		this.is_rebroadcast = obj.is_rebroadcast
		this.channel = obj.channel
		this.work = obj.work
		this.episode = obj.episode
	}
}

export class Channel {
	constructor(obj) {
		this.id = obj.id
		this.name = obj.name
	}
}

export class Work {
	constructor(obj) {
		this.id = obj.id
		this.title = obj.title
		this.title_kana = obj.title_kana
		this.media = obj.media
		this.media_text = obj.media_text
		this.season_name = obj.season_name
		this.season_name_text = obj.season_name_text
		this.released_on = obj.released_on
		this.released_on_about = obj.released_on_about
		this.official_site_url = obj.official_site_url
		this.wikipedia_url = obj.wikipedia_url
		this.twitter_username = obj.twitter_username
		this.twitter_hashtag = obj.twitter_hashtag
		this.episodes_count = obj.episodes_count
		this.watchers_count = obj.watchers_count
	}
}

export class Episode {
	constructor(obj) {
		this.id = obj.id
		this.number = obj.number
		this.number_text = obj.number_text
		this.sort_number = obj.sort_number
		this.title = obj.title
		this.records_count = obj.records_count
		this.work = obj.work
		this.prev_episode = obj.prev_episode
		this.next_episode = obj.next_episode
	}
}

export class User {
	constructor(obj) {
		this.id = obj.id
		this.username = obj.username
		this.name = obj.name
		this.description = obj.description
		this.url = obj.url
		this.records_count = obj.records_count
		this.created_at = obj.created_at
	}
}

export class Record {
	constructor(obj) {
		this.id = obj.id
		this.comment = obj.comment
		this.rating = obj.rating
		this.is_modified = obj.is_modified
		this.likes_count = obj.likes_count
		this.comments_count = obj.comments_count
		this.created_at = obj.created_at
		this.user = obj.user
		this.work = obj.work
		this.episode = obj.episode
	}
}
