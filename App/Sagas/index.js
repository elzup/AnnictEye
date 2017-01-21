import { takeLatest } from 'redux-saga'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'
import { HomeTypes } from '../Redux/HomeRedux'

/* ------------- Sagas ------------- */

import { login, logout, syncLogin } from './LoginSagas'
import { programs } from './HomeSagas'

/* ------------- Connect Types To Sagas ------------- */

const api = API.create()

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT, logout, api),
    takeLatest(LoginTypes.SYNC_LOGIN, syncLogin, api),
    takeLatest(HomeTypes.PROGRAM_REQUEST, programs, api)
  ]
}
