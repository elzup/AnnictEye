'use strict'

// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import {CLIENT_ID, CLIENT_SECRET} from 'react-native-dotenv'
import {Record} from '../Services/Type'

// our "constructor"
const create = (baseURL: string = 'https://api.annict.com/') => {
	const api = apisauce.create({
		baseURL,
		headers: {
			'Cache-Control': 'no-cache'
		},
		timeout: 10000
	})

	const setToken = (token: string) => {
		api.setHeader('Authorization', `Bearer ${token}`)
	}

  /* eslint camelcase: 0 */
	const oauthToken = (code: string) => api.post('oauth/token', {
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		grant_type: 'authorization_code',
		redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
		code: code
	})

	const oauthRevoke = (token: string) => api.post('oauth/revoke', {token: token})

	const mePrograms = () => api.get('v1/me/programs', {sort_started_at: 'desc'})
	const postMeRecord = (record: Record, shareTwitter: boolean, shareFacebook: boolean) => api.post('v1/me/records', {
		episode_id: record.episode.id,
		comment: record.comment,
		rating: record.rating,
		share_twitter: shareTwitter ? 'true' : 'false',
		share_facebook: shareFacebook ? 'true' : 'false'
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
