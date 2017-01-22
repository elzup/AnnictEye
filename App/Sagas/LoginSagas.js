import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { AsyncStorage } from 'react-native'

export function * login (api, {code}) {
  const response = yield call(api.oauthToken, code)
  if (response.ok) {
    const token = response.data.access_token
    yield call(AsyncStorage.setItem, 'access_token', token)
    yield call(AsyncStorage.setItem, 'application_code', code)
    yield put(LoginActions.loginSuccess(token))
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}

export function * logout (api) {
  yield call(api.oauthRevoke)
  yield call(AsyncStorage.removeItem, 'access_token')
  yield call(AsyncStorage.removeItem, 'application_code')
  yield put(LoginActions.logoutSuccess())
}

export function * syncLogin (api: any) {
  const token = yield call(AsyncStorage.getItem, 'access_token')
  if (token === null) {
    yield put(LoginActions.loginFailure('WRONG'))
    return false
  }
  yield put(LoginActions.loginSuccess(token))
  yield call(api.setToken, token)
  return api
}
