import { combineReducers } from 'redux'
import { userFacebookInfo, loggedIn, signedUp, userProfileInfo } from './accounts'
import { currentPage } from './navigation'
import { workoutProgramInfo } from './workout'

export default combineReducers({
    loggedIn,
    userFacebookInfo,
    userProfileInfo,
    signedUp,
    currentPage,
    workoutProgramInfo,
})
