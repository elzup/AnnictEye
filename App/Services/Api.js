// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { CLIENT_ID, CLIENT_SECRET } from 'react-native-dotenv'

// our "constructor"
const create = (baseURL = 'https://api.annict.com/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const getToken = (code) => api.post('oauth/token', {
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'grant_type': 'authorization_code',
    'redirect_uri': 'urn:ietf:wg:oauth:2.0:oob',
    'code': code
  })

  return {
    getToken
  }
}

// let's return back our create method as the default.
export default {
  create
}
