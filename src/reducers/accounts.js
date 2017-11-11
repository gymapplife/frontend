import {
    FACEBOOK_LOGIN,
    FACEBOOK_LOGOUT,
    GAL_SIGNUP_COMPLETE,
    GAL_REMOVEACCOUNT,
    GAL_REMOVEACCOUNT_COMPLETE,
    GAL_GET_PROFILE_COMPLETE,
    SELECT_WORKOUT_PROGRAM,
    COMPLETE_WORKOUT_PROGRAM,
} from '../actions'

export const userFacebookInfo = (initialState = {}, action) => {
    switch (action.type) {
        case FACEBOOK_LOGIN:
            return {
                id: action.response.id,
                name: action.response.name,
                accessToken: action.response.accessToken,
                age: action.response.age_range.min,
                pictureUrl: action.response.picture.data.url
            }
        case FACEBOOK_LOGOUT:
            return {}
        default:
            return initialState
    }
}

export const userProfileInfo = (initialState = {}, action) => {
    switch(action.type) {
        case GAL_GET_PROFILE_COMPLETE:
            console.log("got profile info.", action.profileInfo)
            return action.profileInfo
        case SELECT_WORKOUT_PROGRAM:
            return Object.assign({}, initialState, {current_workout_program: action.workoutId})
        case COMPLETE_WORKOUT_PROGRAM:
            return Object.assign({}, initialState, {current_workout_program: null})
        default:
            return initialState
    }
}

export const loggedIn = (initialState = false, action) => {
    switch (action.type) {
        case FACEBOOK_LOGIN:
            return Boolean(action.response.id)
        case FACEBOOK_LOGOUT:
            return false
        case GAL_REMOVEACCOUNT:
        case GAL_REMOVEACCOUNT_COMPLETE:
            return false
        default:
            return initialState
    }
}

export const signedUp = (initialState = false, action) => {
    switch (action.type) {
        case GAL_SIGNUP_COMPLETE:
            return true;
        case GAL_REMOVEACCOUNT_COMPLETE:
            return false;
        default:
            return initialState
    } 
    return true
}
