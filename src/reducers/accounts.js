import {
    FACEBOOK_LOGIN,
    FACEBOOK_LOGOUT,
    GAL_SIGNUP_COMPLETE,
    GAL_REMOVEACCOUNT_COMPLETE,
} from '../actions'

export const userFacebookInfo = (initialState = {}, action) => {
    switch (action.type) {
        case FACEBOOK_LOGIN:
            return {
                id: action.response.id,
                name: action.response.name,
                accessToken: action.response.accessToken
            }
        case FACEBOOK_LOGOUT:
            return {}
        default:
            return initialState
    }
}

export const loggedIn = (initialState = false, action) => {
    switch (action.type) {
        case FACEBOOK_LOGIN:
            return Boolean(action.response.id)
            break
        case FACEBOOK_LOGOUT:
            return false
            break
        case GAL_REMOVEACCOUNT_COMPLETE:
            return false
            break
        default:
            return initialState
    }
}

export const signedUp = (initialState = false, action) => {
    switch (action.type) {
        case GAL_SIGNUP_COMPLETE:
            return true;
            break
        case GAL_REMOVEACCOUNT_COMPLETE:
            return false;
            break
        default:
            return initialState
    }
}
