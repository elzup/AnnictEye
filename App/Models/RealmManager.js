/* @flow */
import Realm from 'realm';
import {Episode} from '../Services/Type';
import type {Profile} from '../Services/Type';

class Session {
	access_token: string
	user_id: ?number
	username: ?string
	name: ?string
	avatar_url: ?string
}

Session.schema = {
	name: 'Session',
	properties: {
		access_token: 'string',
		user_id: {type: 'int', optional: true},
		username: {type: 'string', optional: true},
		name: {type: 'string', optional: true},
		avatar_url: {type: 'string', optional: true}
	}
};

class EpisodeModel {
	episode_id: number
	comments_count: number
}

EpisodeModel.schema = {
	name: 'EpisodeModel',
	properties: {
		episode_id: 'int',
		comments_count: 'int'
	}
};

class RealmManager {
	realm: Realm;

	constructor(realm: Realm) {
		this.realm = realm;
	}

	isLogin(): boolean {
		return this.realm.objects('Session').length > 0;
	}

	saveAccessToken(access_token: string) {
		realm.write(() => {
			realm.create('Session', {access_token});
		});
	}

	getUser(): Profile {
		const session = this.getSession();
		return {
			user_id: session.user_id || 0,
			username: session.username || '',
			name: session.name || '---',
			avatar_url: session.avatar_url || ''
		};
	}

	saveUser(profile: Profile) {
		const session = this.getSession();
		realm.write(() => {
			session.user_id = profile.user_id;
			session.username = profile.username;
			session.name = profile.name;
			session.avatar_url = profile.avatar_url;
		});
	}

	deleteSession() {
		realm.write(() => {
			realm.delete(realm.objects('Session'));
		});
	}

	getSession(): Session {
		const sessions = this.realm.objects('Session');
		if (sessions.length == 0) {
			throw new Error('ログインしていません');
		}
		return sessions[0];
	}

	async getEpisodes(ids: Array<number>) {
		const episodes = this.realm.objects('EpisodeModel');
		return episodes.filtered(ids.map(id => 'episode_id == ' + id).join(' OR '));
	}

	deleteEpisodes() {
		realm.write(() => {
			realm.delete(realm.objects('EpisodeModel'));
		});
	}

	addEpisode(episode: Episode) {
		realm.write(() => {
			realm.create('EpisodeModel', {
				episode_id: episode.id,
				comments_count: 0
			});
		});
	}

	saveEpisodeReaded(episode: Episode) {
		const ep = this.realm.objects('EpisodeModel').filtered('episode_id == $0', episode.id)[0];
		realm.write(() => {
			ep.comments_count = episode.recordCommentsCount;
		});
	}
}

const realm = new Realm({
	schema: [Session, EpisodeModel],
	schemaVersion: 7
});

const store = new RealmManager(realm);
export {Session, store};
