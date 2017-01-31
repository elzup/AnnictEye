'use strict'

import {call, put} from 'redux-saga/effects'
import HomeActions from '../Redux/HomeRedux'
import LoginActions from '../Redux/LoginRedux'
import {Program} from '../Services/Type'
import {AsyncStorage} from 'react-native'

export function * getPrograms(api: any) {
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
