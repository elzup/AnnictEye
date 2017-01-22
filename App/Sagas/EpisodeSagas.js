// @flow

import { call, put } from 'redux-saga/effects'
import EpisodeActions from '../Redux/EpisodeRedux'
import LoginActions from '../Redux/LoginRedux'
import type { Episode } from '../Services/Type'
import { AsyncStorage } from 'react-native'

export function * loadEpisode (api: any, { episode }) {
  const token = yield call(AsyncStorage.getItem, 'access_token')
  if (token === null) {
    yield put(LoginActions.loginFailure())
    return
  }
  yield put(LoginActions.loginSuccess())
  api.setToken(token)

  const response = yield call(api.mePrograms)
  if (response.ok) {
    const episodes: Array<Episode> = response.data.episodes
    yield put(EpisodeActions.episodeSuccess(episodes))
  } else {
    yield put(EpisodeActions.episodeFailure('WRONG'))
  }
}
