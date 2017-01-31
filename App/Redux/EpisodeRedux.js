'use strict'

import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {Record, Episode, Record} from '../Services/Type'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
	episodeSetup: ['episode'],
	episodeRequest: ['episode'],
	episodeSuccess: ['records'],
	episodeFailure: ['error'],
	postRecordRequest: ['record'],
	postRecordSuccess: ['record'],
	postRecordFailure: ['error']
})

export const EpisodeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = new Immutable({
	records: ([]: Array<Record>),
	episode: (null: ?Episode),
	prevEpisode: (null: ?Episode),
	postResultRecord: (null: ?Record),
	error: null
})

/* ------------- Reducers ------------- */

export const episodeSetup = (state: Object, {episode}: Object) =>
  state.merge({prevEpisode: state.episode, episode})

export const episodeRequest = (state: Object) => state.merge({})

export const episodeSuccess = (state: Object, {records}: Object) =>
  state.merge({error: null, records})

export const episodeFailure = (state: Object, {error}: Object) =>
  state.merge({error})

export const postRecordRequest = (state: Object) => state

export const postRecordSuccess = (state: Object, {postResultRecord}: Object) =>
  state.merge({error: null, postResultRecord})

export const postRecordFailure = (state: Object, {error}: Object) =>
  state.merge({error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.EPISODE_SETUP]: episodeSetup,
	[Types.EPISODE_REQUEST]: episodeRequest,
	[Types.EPISODE_SUCCESS]: episodeSuccess,
	[Types.EPISODE_FAILURE]: episodeFailure,
	[Types.POST_RECORD_REQUEST]: postRecordRequest,
	[Types.POST_RECORD_SUCCESS]: postRecordSuccess,
	[Types.POST_RECORD_REQUEST]: postRecordFailure
})

/* ------------- Selectors ------------- */
export const selectEpisode = (episodeState: Object) => episodeState.episode
export const selectRecords = (episodeState: Object) => episodeState.records
export const isSomeEpisode = (episodeState: Object) => episodeState.prevEpisode === null || episodeState.episode.id === episodeState.prevEpisode.id
