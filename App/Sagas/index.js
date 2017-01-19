import { takeLatest } from 'redux-saga'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'

/* ------------- Sagas ------------- */

import { login, logout } from './LoginSagas'

/* ------------- Connect Types To Sagas ------------- */

const api = API.create()

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT, logout, api)
  ]
}
