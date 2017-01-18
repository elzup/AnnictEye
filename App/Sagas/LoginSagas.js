import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import Annict from 'annict'
import { CLIENT_ID, CLIENT_SECRET } from 'react-native-dotenv'

// attempts to login
export function * login ({code}) {
  const annict = new Annict()
  try {
    const token = yield call(annict.OAuth.token,
      CLIENT_ID,
      CLIENT_SECRET,
      'authorization_code',
      'urn:ietf:wg:oauth:2.0:oob',
      code
    )
    console.log(token)
    yield put(LoginActions.loginSuccess(token.access_token))
    // yield put(LoginActions.loginSuccess('DUMMY TOKEN'))
  } catch (e) {
    console.log(e)
    yield put(LoginActions.loginFailure('WRONG'))
  }
}
