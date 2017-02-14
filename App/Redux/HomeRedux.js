/* @flow */
'use strict'

import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {Program} from '../Services/Type'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
	programRequest: null,
	programSuccess: ['programs'],
	programFailure: ['error']
})

export const HomeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = new Immutable({
	programs: [],
	error: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({})

// we've successfully logged in
export const success = (state: Object, {programs}: Object) =>
  state.merge({error: null, programs})

// we've had a problem logging in
export const failure = (state: Object, {error}: Object) =>
  state.merge({error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.PROGRAM_REQUEST]: request,
	[Types.PROGRAM_SUCCESS]: success,
	[Types.PROGRAM_FAILURE]: failure
})

/* ------------- Selectors ------------- */
export const selectPrograms = (homeState: Object)
	=> homeState.programs.map((e) => new Program(e))
