import {takeLatest} from 'redux-saga'
import API from '../Services/Api'

/* ------------- Types ------------- */

import {LoginTypes} from '../Redux/LoginRedux'
import {HomeTypes} from '../Redux/HomeRedux'
import {EpisodeTypes} from '../Redux/EpisodeRedux'

/* ------------- Sagas ------------- */

import {login, logout} from './LoginSagas'
import {getPrograms} from './HomeSagas'
import {loadEpisode, postRecord} from './EpisodeSagas'

/* ------------- Connect Types To Sagas ------------- */

const api = API.create()

export default function * root() {
	yield [
    // some sagas only receive an action
		takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
		takeLatest(LoginTypes.LOGOUT, logout, api),
		takeLatest(HomeTypes.PROGRAM_REQUEST, getPrograms, api),
		takeLatest(EpisodeTypes.EPISODE_REQUEST, loadEpisode, api),
		takeLatest(EpisodeTypes.POST_RECORD, postRecord, api)
	]
}
