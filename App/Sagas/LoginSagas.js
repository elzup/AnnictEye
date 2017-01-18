import { put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export default function* login (action) {
  // const annict = new Annict()
  try {
    // const token = yield call(annict.OAuth.token,
    //   CLIENT_ID,
    //   CLIENT_SECRET,
    //   'authorization_code',
    //   'urn:ietf:wg:oauth:2.0:oob',
    //   action.payload.code
    // )
    // yield put(LoginActions.loginSuccess(token.access_token))
    yield put(LoginActions.loginSuccess('DUMMY TOKEN'))
  } catch (e) {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}
