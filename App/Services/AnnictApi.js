/* @flow */

import {CLIENT_ID, CLIENT_SECRET} from 'react-native-dotenv';
import {create} from 'apisauce';
import moment from 'moment';

import {Program, Record, Episode} from './Type';
import {store} from '../Models/RealmManager';

import type {RecordFields} from '../Services/Type';

class AnnictApi {
	token: string
	api: any
	host = 'https://api.annict.com/'

	constructor() {
		console.log('Gen AnncitAPI');
		this.api = create({
			baseURL: this.host,
			timeout: 10000
		});

		if (store.isLogin()) {
			const session = store.getSession();
			this.setToken(session.access_token);
			console.log(session);
			if (session.id == null) {
				this.userInfoSync();
			}
		}
	}

	async userInfoSync() {
		const userInfo = await this.getMe();
		store.saveUser(userInfo.id, userInfo.username);
	}

	setToken(token: string) {
		this.token = token;
		this.api.setHeader('Authorization', `Bearer ${token}`);
	}

	oauthToken(code: string) {
		return this.api.post('oauth/token', {
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			grant_type: 'authorization_code',
			redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
			code
		});
	}

	oauthRevoke() {
		return this.api.post('oauth/revoke', {token: this.token});
	}

	async getMe() {
		const res = await this.api.get('v1/me');
		this.errorCheck(res);
		return res.data;
	}

	async getPrograms(): Promise<Array<Program>> {
		const params = {
			sort_started_at: 'desc',
			filter_started_at_lt: moment().format('Y/MM/DD HH:mm')
		};
		const res = await Promise.all([
			this.api.get('v1/me/programs', params),
			this.api.get('v1/me/programs', {...params, filter_unwatched: true})
		]);
		this.errorCheck(res[0]);
		this.errorCheck(res[1]);
		const unwatched_program_ids = res[1].data.programs.map(e => e.id);
		return res[0].data.programs.map(e => {
			const r = new Program(e);
			r.episode.isWatched = !unwatched_program_ids.includes(r.id);
			return r;
		});
	}

	async getRecords(episodeID: number): Promise<Array<Record>> {
		const res = await this.api.get('v1/records', {
			filter_episode_id: episodeID,
			filter_has_record_comment: true
		});
		this.errorCheck(res);
		const records: Array<Record> = res.data.records.map(e => new Record(e));
		const myRecords = records.filter(e => e.user.id == store.getSession().user_id);
		const otherRecords = records.filter(e => e.user.id != store.getSession().user_id);
		myRecords.forEach(e => {
			e.isMine = true;
		});
		return myRecords.concat(otherRecords);
	}

	errorCheck(res: any) {
		if (res.status == 401) {
			throw new Error('no-auth');
		}
	}

	async postRecord(fields: RecordFields) {
		const res = await this.api.post('v1/me/records', fields);
		this.errorCheck(res);
		return res;
	}

	login(code: string): boolean {
		return false;
	}

	authURL(): string {
		return [
			`${this.host}oauth/authorize`,
			'?response_type=code',
			'&client_id=' + CLIENT_ID,
			'&redirect_uri=urn:ietf:wg:oauth:2.0:oob',
			'&scope=read+write'
		].join('');
	}

	recordURL(record: Record): string {
		return `https://annict.com/@${record.user.username}/records/${record.id}`;
	}
}
const client = new AnnictApi();

export {client};
