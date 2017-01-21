// @flow

import { call, put } from 'redux-saga/effects'
import HomeActions from '../Redux/HomeRedux'
import type { Program } from '../Services/Type'

// import LoginActions from '../Redux/LoginRedux'
// import { AsyncStorage } from 'react-native'

export function * getPrograms (api: any) {
  const response = yield call(api.mePrograms)
  if (response.ok) {
    const programs: Array<Program> = response.data.programs
    yield put(HomeActions.programSuccess(programs))
  } else {
    yield put(HomeActions.programFailure('WRONG'))
  }
}
