/* @flow */
'use strict'

import type moment$Moment from 'moment'

/* eslint camelcase: 0 */
export class Program {
	id: number
	startedAt: moment$Moment
	isRebroadcast: boolean
	channel: string
	work: Work
	episode: Episode

	constructor(obj: any) {
		this.id = obj.id
		this.startedAt = obj.started_at
		this.isRebroadcast = obj.is_rebroadcast
		this.channel = obj.channel
		this.work = obj.work
		this.episode = obj.episode
	}
}

export class Channel {
	id: number
	name: string

	constructor(obj: any) {
		Object.assign(this, obj)
	}
}

export class Work {
	id: number
	title: string
	titleKana: string
	media: string
	mediaText: string
	seasonName: string
	seasonName_text: string
	releasedOn: string
	releasedOn_about: string
	officialSiteUrl: string
	wikipediaUrl: string
	twitterUsername: string
	twitterHashtag: string
	episodesCount: number
	watchersCount: number

	constructor(obj: any) {
		this.id = obj.id
		this.title = obj.title
		this.titleKana = obj.title_kana
		this.media = obj.media
		this.mediaText = obj.media_text
		this.seasonName = obj.season_name
		this.seasonName_text = obj.season_name_text
		this.releasedOn = obj.released_on
		this.releasedOn_about = obj.released_on_about
		this.officialSiteUrl = obj.official_site_url
		this.wikipediaUrl = obj.wikipedia_url
		this.twitterUsername = obj.twitter_username
		this.twitterHashtag = obj.twitter_hashtag
		this.episodesCount = obj.episodes_count
		this.watchersCount = obj.watchers_count
	}
}

export class Episode {
	id: string
	number: string
	number_text: string
	sort_number: string
	title: string
	records_count: string
	work: string
	prev_episode: string
	next_episode: string

	constructor(obj: any) {
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
	id: string
	username: string
	name: string
	description: string
	url: string
	records_count: string
	created_at: string

	constructor(obj: any) {
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
	id: string
	comment: string
	rating: string
	is_modified: string
	likes_count: string
	comments_count: string
	created_at: string
	user: string
	work: string
	episode: string

	constructor(obj: any) {
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
