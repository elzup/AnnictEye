import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

export function * login (api, {code}) {
  const response = yield call(api.oauthToken, code)
  console.log(response)
  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data.access_token))
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}

export function * logout (api) {
  const response = yield call(api.oauthRevoke)
  console.log(response)
  yield put(LoginActions.logout())
}
