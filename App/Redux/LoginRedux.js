// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['code'],
  loginSuccess: ['access_token'],
  loginFailure: ['error'],
  syncLogin: null,
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  access_token: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state: Object, { access_token }: Object) =>
  state.merge({ fetching: false, error: null, access_token })

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

// we've logged out
export const logout = (state: Object) => INITIAL_STATE

//
export const sync = (state: Object) => state.merge({ fetching: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.SYNC_LOGIN]: sync,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.access_token !== null
