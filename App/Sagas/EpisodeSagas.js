'use strict'

import {call, put} from 'redux-saga/effects'
import EpisodeActions from '../Redux/EpisodeRedux'
import LoginActions from '../Redux/LoginRedux'
import {AsyncStorage} from 'react-native'

export function * loadEpisode(api: any, {episode}) {
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

export function * postRecord(api: any, {record, shareTwitter, shareFacebook}) {
	const token = yield call(AsyncStorage.getItem, 'access_token')
	if (token === null) {
		yield put(LoginActions.loginFailure())
		return
	}
	yield put(LoginActions.loginSuccess())
	api.setToken(token)

	const response = yield call(api.postMeRecord, record, shareTwitter, shareFacebook)
	if (response.ok) {
		yield put(EpisodeActions.postRecordSuccess(response.data))
	} else {
		yield put(EpisodeActions.postRecordFailure('WRONG'))
	}
}
