/*
 * action types
 */

export const FACEBOOK_LOGIN = 'FACEBOOK_LOGIN'
export const FACEBOOK_LOGOUT = 'FACEBOOK_LOGOUT'

/*
 * action creators
 */

export const facebookLogin = response => {
    return { type: FACEBOOK_LOGIN, response: response }
}

export const facebookLogout = () => {
    return { type: FACEBOOK_LOGOUT }
}
