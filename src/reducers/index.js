import { combineReducers } from 'redux'
import { userFacebookInfo, loggedIn, signedUp, userProfileInfo } from './accounts'
import { currentPage } from './navigation'

export default combineReducers({
    loggedIn,
    userFacebookInfo,
    userProfileInfo,
    signedUp,
    currentPage,
})
