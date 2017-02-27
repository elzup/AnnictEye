/* @flow */

import {CLIENT_ID, CLIENT_SECRET} from 'react-native-dotenv';
import {Program, Record} from './Type';
import {store} from '../Models/RealmManager';
import {create} from 'apisauce';
import moment from 'moment';

import type {RecordFields} from '../Services/Type';

class AnnictApi {
	token: string
	api: any

	constructor() {
		this.api = create({
			baseURL: 'https://api.annict.com/',
			timeout: 10000
		});

		if (store.isLogin()) {
			const session = store.getSession();
			this.setToken(session.access_token);
		}
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

	async getPrograms(): Promise<Array<Program>> {
		const params = {
			sort_started_at: 'desc',
			filter_started_at_lt: moment().format('Y/MM/DD HH:mm')
		};
		const res = await this.api.get('v1/me/programs', params);
		this.errorCheck(res);
		return res.data.programs.map(e => new Program(e));
	}

	async getRecords(episodeID: number): Promise<Array<Record>> {
		const res = await this.api.get('v1/records', {
			filter_episode_id: episodeID,
			filter_has_record_comment: true
		});
		this.errorCheck(res);
		return res.data.records.map(e => new Record(e));
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
}
const client = new AnnictApi();

export {client};
