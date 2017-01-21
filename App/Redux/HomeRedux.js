// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  episodeRequest: null,
  episodeSuccess: ['access_token'],
  episodeFailure: ['error']
})

export const HomeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  episodes: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state: Object, { episodes }: Object) =>
  state.merge({ fetching: false, error: null, episodes })

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EPISODE_REQUEST]: request,
  [Types.EPISODE_SUCCESS]: success,
  [Types.EPISODE_FAILURE]: failure
})

/* ------------- Selectors ------------- */

// Get episodes
export const isLoggedIn = (loginState: Object) => loginState.access_token !== null
