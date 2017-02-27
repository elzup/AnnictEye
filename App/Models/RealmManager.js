/* @flow */
import Realm from 'realm';

class Session {
	access_token: string
}

Session.schema = {
	name: 'Session',
	properties: {
		access_token: 'string'
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

	getSession(): Session {
		const sessions = this.realm.objects('Session');
		if (sessions.length == 0) {
			throw new Error('ログインしていません');
		}
		return sessions[0];
	}
}

const realm = new Realm({
	schema: [Session],
	schemaVersion: 0
});

const store = new RealmManager(realm);
export {Session, store};
