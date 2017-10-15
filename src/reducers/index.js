import { combineReducers } from 'redux'
import { userInfo, loggedIn } from './facebook'

export default combineReducers({
    loggedIn,
    userInfo,
})
