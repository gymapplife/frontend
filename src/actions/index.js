/*
 * action types
 */

export const FACEBOOK_LOGIN = 'FACEBOOK_LOGIN'
export const FACEBOOK_LOGOUT = 'FACEBOOK_LOGOUT'
export const GAL_SIGNUP = 'GAL_SIGNUP'
export const GAL_SIGNUP_COMPLETE = 'GAL_SIGNUP_COMPLETE'
export const GAL_UPDATE_PROFILE = 'GAL_UPDATE_PROFILE'
export const GAL_UPDATE_PROFILE_COMPLETE = 'GAL_UPDATE_PROFILE_COMPLETE'
export const GAL_REMOVEACCOUNT = 'GAL_REMOVEACCOUNT'
export const GAL_REMOVEACCOUNT_COMPLETE = 'GAL_REMOVEACCOUNT_COMPLETE'
export const GAL_GET_PROFILE = 'GAL_GET_PROFILE'
export const GAL_GET_PROFILE_COMPLETE = 'GAL_GET_PROFILE_COMPLETE'
export const SELECT_WORKOUT_PROGRAM = 'SELECT_WORKOUT_PROGRAM'
export const SELECT_WORKOUT_PROGRAM_COMPLETE = 'SELECT_WORKOUT_PROGRAM_COMPLETE'
export const COMPLETE_WORKOUT_PROGRAM = 'COMPLETE_WORKOUT_PROGRAM'
export const SUBMIT_WORKOUT_DAY = 'SUBMIT_WORKOUT_DAY'

export const NAVIGATE_TO_PAGE = "NAVIGATE_TO_PAGE"

/*
 * action creators
 */

export const galSignup = (userid, usertok, goal, experience, weight, height) => {
    return { 
        type: GAL_SIGNUP,
        signupInfo: {
            userid: userid, 
            usertok: usertok,
            goal: goal,
            experience: experience,
            weight: weight,
            height: height
        }
    }
}

export const galConfirmSignedUp = () => {
    return {type: GAL_SIGNUP_COMPLETE}
}

export const galUpdateProfile = (userid, usertok, goal, experience, weight, height) => {
    return {
        type: GAL_UPDATE_PROFILE,
        updateInfo: {
            userid: userid, 
            usertok: usertok,
            goal: goal,
            experience: experience,
            weight: weight,
            height: height
        }
    }
}

export const galRemoveAccount = (userid, usertok) => {
    return { 
        type: GAL_REMOVEACCOUNT,
        userInfo: {
            userid: userid,
            usertok: usertok
        }
    }
}

export const galGetProfile = (userid, usertok) => {
    return {
        type: GAL_GET_PROFILE,
        userInfo: {
            userid: userid,
            usertok: usertok
        }
    }
}

export const facebookLogin = response => {
    return { type: FACEBOOK_LOGIN, response: response }
}

export const facebookLogout = () => {
    return { type: FACEBOOK_LOGOUT }
}

export const navigateTo = (page) => {
    return { type: NAVIGATE_TO_PAGE, to: page }
}

export const selectWorkoutProgram = (workoutId, isCustom, userid, usertok) => {
    return {
        type: SELECT_WORKOUT_PROGRAM,
        workoutId: workoutId,
        isCustom: isCustom, 
        userInfo: {
            userid: userid,
            usertok: usertok
        }
    }
}

export const completeWorkoutProgram = (userid, usertok) => {
    return {
        type: COMPLETE_WORKOUT_PROGRAM,
        userInfo: {
            userid: userid,
            usertok: usertok
        }
    }
}

export const submitWorkDay = (logs, wd, userid, usertok) => {
    return {
        type: SUBMIT_WORKOUT_DAY, 
        logs: logs, 
        workday: wd,
        userInfo: {
            userid: userid,
            usertok: usertok
        }
    }
}