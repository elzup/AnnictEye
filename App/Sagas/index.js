import { takeLatest } from 'redux-saga'
import { call } from 'redux-saga/effects'
import API from '../Services/Api'
import { AsyncStorage } from 'react-native'

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'

/* ------------- Sagas ------------- */

import { login, logout } from './LoginSagas'

/* ------------- Connect Types To Sagas ------------- */

const api = API.create()

export default function * root () {
  const token = yield call(AsyncStorage.getItem, 'access_token')
  if (token !== null) {
    yield call(api.setToken, token)
  }
  yield [
    // some sagas only receive an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT, logout, api)
  ]
}
