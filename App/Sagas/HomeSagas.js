import { call, put } from 'redux-saga/effects'
import HomeActions from '../Redux/HomeRedux'

export function * progurams (api) {
  const response = yield call(api.mePrograms)
  if (response.ok) {
  } else {
    yield put(HomeActions.episodeFailure('WRONG'))
  }
}
