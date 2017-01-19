import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

export function * login (api, {code}) {
  const response = yield call(api.getToken, code)
  console.log(response)
  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data.access_token))
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}
