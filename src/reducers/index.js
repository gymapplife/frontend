import { combineReducers } from 'redux'
import { userFacebookInfo, loggedIn, signedUp } from './accounts'

export default combineReducers({
    loggedIn,
    userFacebookInfo,
    signedUp,
})
