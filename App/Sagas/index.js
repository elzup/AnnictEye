import { takeEvery } from 'redux-saga'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'

/* ------------- Sagas ------------- */

import { login, logout, syncLogin } from './LoginSagas'

/* ------------- Connect Types To Sagas ------------- */

const api = API.create()

export default function * root () {
  yield [
    // some sagas only receive an action
    takeEvery(LoginTypes.LOGIN_REQUEST, login, api),
    takeEvery(LoginTypes.LOGOUT, logout, api),
    takeEvery(LoginTypes.SYNC_LOGIN, syncLogin, api)
  ]
}
