import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { AsyncStorage } from 'react-native'

export function * login (api, {code}) {
  const response = yield call(api.oauthToken, code)
  if (response.ok) {
    const token = response.data
    yield put(LoginActions.loginSuccess(token))
    yield call(AsyncStorage.setItem, 'access_token', token)
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}

export function * logout (api) {
  const response = yield call(api.oauthRevoke)
  console.log(response)
  yield put(LoginActions.logout())
  yield call(AsyncStorage.removeItem, 'access_token')
}
