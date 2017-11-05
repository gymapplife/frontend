/*
 * action types
 */

export const FACEBOOK_LOGIN = 'FACEBOOK_LOGIN'
export const FACEBOOK_LOGOUT = 'FACEBOOK_LOGOUT'
export const GAL_SIGNUP = 'GAL_SIGNUP'
export const GAL_SIGNUP_COMPLETE = 'GAL_SIGNUP_COMPLETE'
export const GAL_REMOVEACCOUNT = 'GAL_REMOVEACCOUNT'
export const GAL_REMOVEACCOUNT_COMPLETE = 'GAL_REMOVEACCOUNT_COMPLETE'

/*
 * action creators
 */

export const galSignup = (goal, experience, weight, height) => {
    return { 
        type: GAL_SIGNUP,
        goal: goal,
        experience: experience,
        weight: weight,
        height: height
    }
}

export const galRemoveAccount = () => {
    return { type: GAL_REMOVEACCOUNT }
}

export const facebookLogin = response => {
    return { type: FACEBOOK_LOGIN, response: response }
}

export const facebookLogout = () => {
    return { type: FACEBOOK_LOGOUT }
}
