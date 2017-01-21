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
  yield put(LoginActions.logout)
  yield call(AsyncStorage.removeItem, 'access_token')
  yield call(AsyncStorage.removeItem, 'application_code')
}

export function * syncLogin (api) {
  console.log('=> syncLogin')
  const token = yield call(AsyncStorage.getItem, 'access_token')
  if (token !== null) {
    yield call(api.setToken, token)
    yield call(AsyncStorage.setItem, 'access_token', token)
    yield put(LoginActions.loginSuccess(token))
    console.log('token setted')
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}
