/* @flow */
import Realm from 'realm';

class Session {
	access_token: string
	user_id: number
	username: string
}

Session.schema = {
	name: 'Session',
	properties: {
		access_token: 'string',
		user_id: 'int',
		username: 'string'
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

	saveUser(user_id: number, username: string) {
		const session = this.getSession();
		realm.write(() => {
			session.user_id = user_id;
			session.username = username;
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
}

const realm = new Realm({
	schema: [Session],
	schemaVersion: 1
});

const store = new RealmManager(realm);
export {Session, store};
