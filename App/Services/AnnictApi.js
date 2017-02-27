/* @flow */

import {CLIENT_ID, CLIENT_SECRET} from 'react-native-dotenv';
import {Program} from './Type';

class AnnictApi {
	constructor() {

	}

	isLogin(): boolean {
		return false;
	}

	oauthToken(code: string) {

	}

	oauthRevoke(token: string) {

	}

	mePrograms() {

	}

	postRecord() {

	}

	getRecords(episodeID: number) {

	}

	login(code: string): boolean {
		return false;
	}

	getPrograms(): Array<Program> {
		return [];
	}
}
const client = new AnnictApi();

export {client};
