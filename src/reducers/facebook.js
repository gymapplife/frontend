import {
    FACEBOOK_LOGIN,
    FACEBOOK_LOGOUT,
} from '../actions'

export const userInfo = (initialState = {}, action) => {
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
        case FACEBOOK_LOGOUT:
            return false
        default:
            return initialState
    }
}
