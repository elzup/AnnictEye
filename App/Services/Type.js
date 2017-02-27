/* @flow */

import type moment$Moment from 'moment';
import moment from 'moment';

export type ProgramScheme = {
	id: string,
	started_at: string,
	is_rebroadcast: string,
	channel: Channel,
	work: WorkScheme,
	episode: EpisodeScheme
}

/* eslint camelcase: 0 */
export class Program {
	id: number
	startedAt: moment$Moment
	isRebroadcast: boolean
	channel: Channel
	work: Work
	episode: Episode

	constructor(obj: ProgramScheme) {
		this.id = parseInt(obj.id);
		this.channel = new Channel(obj.channel);
		this.work = new Work(obj.work);
		this.episode = new Episode(obj.episode);
		this.startedAt = moment(obj.started_at);
		this.isRebroadcast = obj.is_rebroadcast == 'true';
	}
}

export class Channel {
	id: number
	name: string

	constructor(obj: { id: number, name: string }) {
		Object.assign(this, obj);
	}
}

export type WorkScheme = {
	id: string,
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
	episodes_count: string,
	watchers_count: string
}

export class Work {
	id: number
	title: string
	titleKana: string
	media: string
	mediaText: string
	seasonName: string
	seasonNameText: string
	releasedOn: moment$Moment
	releasedOnAbout: string
	officialSiteUrl: string
	wikipediaUrl: string
	twitterUsername: string
	twitterHashtag: string
	episodesCount: number
	watchersCount: number

	constructor(obj: WorkScheme) {
		this.id = parseInt(obj.id);
		this.title = obj.title;
		this.titleKana = obj.title_kana;
		this.media = obj.media;
		this.mediaText = obj.media_text;
		this.seasonName = obj.season_name;
		this.seasonNameText = obj.season_name_text;
		this.releasedOn = moment(obj.released_on);
		this.releasedOnAbout = obj.released_on_about;
		this.officialSiteUrl = obj.official_site_url;
		this.wikipediaUrl = obj.wikipedia_url;
		this.twitterUsername = obj.twitter_username;
		this.twitterHashtag = obj.twitter_hashtag;
		this.episodesCount = parseInt(obj.episodes_count);
		this.watchersCount = parseInt(obj.watchers_count);
	}
}

export type EpisodeScheme = {
	id: string,
	number: string,
	number_text: string,
	sort_number: string,
	title: string,
	records_count: string,
	work: ?WorkScheme,
	prev_episode: ?EpisodeScheme,
	next_episode: ?EpisodeScheme
}

export class Episode {
	id: number
	number: number
	numberText: string
	sortNumber: number
	title: string
	recordsCount: number
	work: ?Work
	prevEpisode: ?Episode
	nextEpisode: ?Episode

	constructor(obj: EpisodeScheme) {
		this.id = parseInt(obj.id);
		this.numberText = obj.number_text;
		this.sortNumber = parseInt(obj.sort_number);
		this.title = obj.title;
		this.recordsCount = parseInt(obj.records_count);
		if (obj.work != null) {
			this.work = new Work(obj.work);
		}
		if (obj.prev_episode != null) {
			this.prevEpisode = new Episode(obj.prev_episode);
		} else {
			this.prevEpisode = null;
		}
		if (obj.next_episode != null) {
			this.nextEpisode = new Episode(obj.next_episode);
		} else {
			this.nextEpisode = null;
		}
	}

	safeTilte() {
		return this.title || '---';
	}
}

export type UserScheme = {
	id: string,
	username: string,
	name: string,
	description: string,
	url: string,
	records_count: string,
	created_at: string
}

export class User {
	id: string
	username: string
	name: string
	description: string
	url: string
	recordsCount: number
	createdAt: moment$Moment

	constructor(obj: UserScheme) {
		this.id = obj.id;
		this.username = obj.username;
		this.name = obj.name;
		this.description = obj.description;
		this.recordsCount = parseInt(obj.records_count);
		this.createdAt = moment(obj.created_at);
	}
}

export type RecordScheme = {
	id: string,
	comment: string,
	rating: string,
	is_modified: string,
	likes_count: string,
	comments_count: string,
	created_at: string,
	user: UserScheme,
	work: WorkScheme,
	episode: EpisodeScheme
}

export class Record {
	id: number
	comment: string
	rating: number
	isModified: boolean
	likesCount: number
	commentsCount: number
	createdAt: moment$Moment
	user: User
	work: Work
	episode: Episode

	constructor(obj: RecordScheme) {
		this.id = parseInt(obj.id);
		this.comment = obj.comment;
		this.rating = parseFloat(obj.rating);
		this.isModified = obj.is_modified == 'true';
		this.likesCount = parseInt(obj.likes_count);
		this.commentsCount = parseInt(obj.comments_count);
		this.createdAt = moment(obj.created_at);
		this.user = new User(obj.user);
		this.work = new Work(obj.work);
		this.episode = new Episode(obj.episode);
	}

	postTimeLabel() {
		this.createdAt.format('MM/DD HH:mm');
	}
	hasComment() {
		this.comment && this.comment !== '';
	}
}

export type RecordFields = {
	episode_id: number,
	comment: string,
	rating: number,
	share_twitter: boolean,
	share_facebook: boolean
}
