/* @flow */


// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import {CLIENT_ID, CLIENT_SECRET} from 'react-native-dotenv'
import type {RecordFields} from '../Services/Type'

// our "constructor"
const create = (baseURL: string = 'https://api.annict.com/') => {

	const mePrograms = () => api.get('v1/me/programs', {sort_started_at: 'desc'})
	const postMeRecord = (recordFields: RecordFields) => api.post('v1/me/records', {
		episode_id: recordFields.episode_id
		comment: recordFields.comment,
		rating: recordFields.rating,
		share_twitter: recordFields.shareTwitter ? 'true' : 'false',
		share_facebook: recordFields.shareFacebook ? 'true' : 'false'
	})

	const records = (episodeID: number) => api.get('v1/records', {
		filter_episode_id: episodeID,
		per_page: 50,
		sort_id: 'desc'
	})

	return {
		oauthToken,
		oauthRevoke,
		mePrograms,
		setToken,
		records,
		postMeRecord
	}
}

// let's return back our create method as the default.
export default {
	create
}
