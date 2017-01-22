// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import type { Record, Episode } from '../Services/Type'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  episodeRequest: ['episode'],
  episodeSuccess: ['records'],
  episodeFailure: ['error']
})

export const EpisodeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  records: ([]: Array<Record>),
  episode: (null: ?Episode),
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const episodeRequest = (state: Object) => state.merge({ fetching: true })

// we've successfully logged in
export const episodeSuccess = (state: Object, { records }: Object) =>
  state.merge({ fetching: false, error: null, records })

// we've had a problem logging in
export const episodeFailure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EPISODE_REQUEST]: episodeRequest,
  [Types.EPISODE_SUCCESS]: episodeSuccess,
  [Types.EPISODE_FAILURE]: episodeFailure
})

/* ------------- Selectors ------------- */
export const selectEpisode = (episodeState: Object) => episodeState.episode
export const selectRecords = (episodeState: Object) => episodeState.records
