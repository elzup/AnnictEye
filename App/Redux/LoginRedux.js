'use strict'

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['code'],
  loginSuccess: [],
  loginFailure: ['error'],
  logout: null,
  logoutSuccess: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoggedIn: null,
  error: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state

// we've successfully logged in
export const success = (state: Object) =>
  state.merge({ error: null, isLoggedIn: true })

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ error, isLoggedIn: false })

// we've logged out
export const logout = (state: Object) => state
export const logoutSuccess = (state: Object) =>
  state.merge({ error: null, isLoggedIn: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
  [Types.LOGOUT_SUCCESS]: logoutSuccess
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.isLoggedIn
