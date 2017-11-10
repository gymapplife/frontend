import { combineReducers } from 'redux'
import { userFacebookInfo, loggedIn, signedUp } from './accounts'
import { currentPage } from './navigation'

export default combineReducers({
    loggedIn,
    userFacebookInfo,
    signedUp,
    currentPage,
})
