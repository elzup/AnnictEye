// @flow

import { call, put } from 'redux-saga/effects'
import EpisodeActions from '../Redux/EpisodeRedux'
import LoginActions from '../Redux/LoginRedux'
import type { Record } from '../Services/Type'
import { AsyncStorage } from 'react-native'

export function * loadEpisode (api: any, { episode }) {
  const token = yield call(AsyncStorage.getItem, 'access_token')
  if (token === null) {
    yield put(LoginActions.loginFailure())
    return
  }
  yield put(LoginActions.loginSuccess())
  api.setToken(token)

  const response = yield call(api.records)
  if (response.ok) {
    const records: Array<Record> = response.data.records
    yield put(EpisodeActions.episodeSuccess(records))
  } else {
    yield put(EpisodeActions.episodeFailure('WRONG'))
  }
}
