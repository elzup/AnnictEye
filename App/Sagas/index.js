import {takeLatest} from 'redux-saga'
import API from '../Services/Api'

/* ------------- Types ------------- */

import LoginActions, {LoginTypes} from '../Redux/LoginRedux'
import HomeActions, {HomeTypes} from '../Redux/HomeRedux'
import EpisodeActions, {EpisodeTypes} from '../Redux/EpisodeRedux'

/* ------------- Sagas ------------- */
import {call, put} from 'redux-saga/effects'
import {AsyncStorage} from 'react-native'
import {Program} from '../Services/Type'

function * login(api, {code}) {
	const response = yield call(api.oauthToken, code)
	if (response.ok) {
		const token = response.data.access_token
		yield call(AsyncStorage.setItem, 'access_token', token)
		yield call(AsyncStorage.setItem, 'application_code', code)
		yield put(LoginActions.loginSuccess())
	} else {
		yield put(LoginActions.loginFailure('WRONG'))
	}
}

function * logout(api) {
	yield call(api.oauthRevoke)
	yield call(AsyncStorage.removeItem, 'access_token')
	yield call(AsyncStorage.removeItem, 'application_code')
	yield put(LoginActions.logoutSuccess())
}

function * getPrograms(api: any) {
	const token = yield call(AsyncStorage.getItem, 'access_token')
	if (token === null) {
		yield put(LoginActions.loginFailure('WRONG'))
		return
	}
	yield put(LoginActions.loginSuccess())
	api.setToken(token)

	const response = yield call(api.mePrograms)
	if (response.ok) {
		const programs: Array<Program> = response.data.programs
		yield put(HomeActions.programSuccess(programs))
	} else {
		yield put(HomeActions.programFailure('WRONG'))
	}
}

function * loadEpisode(api: any, {episode}) {
	const token = yield call(AsyncStorage.getItem, 'access_token')
	if (token === null) {
		yield put(LoginActions.loginFailure())
		return
	}
	yield put(LoginActions.loginSuccess())
	api.setToken(token)

	const response = yield call(api.records, episode.id)
	if (response.ok) {
		yield put(EpisodeActions.episodeSuccess(response.data.records))
	} else {
		yield put(EpisodeActions.episodeFailure('WRONG'))
	}
}

function * postRecord(api: any, {record, st, sf}) {
	const token = yield call(AsyncStorage.getItem, 'access_token')
	if (token === null) {
		yield put(LoginActions.loginFailure())
		return
	}
	yield put(LoginActions.loginSuccess())
	api.setToken(token)

	const response = yield call(api.postMeRecord, record, st, sf)
	if (response.ok) {
		yield put(EpisodeActions.postRecordSuccess(response.data))
	} else {
		yield put(EpisodeActions.postRecordFailure('WRONG'))
	}
}

/* ------------- Connect Types To Sagas ------------- */

const api = API.create()

export default function * root() {
	yield [
    // some sagas only receive an action
		takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
		takeLatest(LoginTypes.LOGOUT, logout, api),
		takeLatest(HomeTypes.PROGRAM_REQUEST, getPrograms, api),
		takeLatest(EpisodeTypes.EPISODE_REQUEST, loadEpisode, api),
		takeLatest(EpisodeTypes.POST_RECORD_REQUEST, postRecord, api)
	]
}
