import request from 'superagent'
import {
    FACEBOOK_LOGOUT,
    GAL_SIGNUP,
    GAL_SIGNUP_COMPLETE,
    GAL_REMOVEACCOUNT,
    GAL_REMOVEACCOUNT_COMPLETE,
    GAL_GET_PROFILE,
    GAL_GET_PROFILE_COMPLETE,
    SELECT_WORKOUT_PROGRAM,
    SELECT_WORKOUT_PROGRAM_COMPLETE,
    COMPLETE_WORKOUT_PROGRAM,
    SUBMIT_WORKOUT_DAY,
} from '../actions'
import * as constants from '../constants'

const apiservice = store => next => action => {
    // Pass all actions througt by default
    next(action);
    switch (action.type) {
        case GAL_SIGNUP:
            request
                .post(constants.GAL_BACKEND_PROFILE_URL)
                .auth(action.signupInfo.userid, action.signupInfo.usertok)
                .type('form')
                .send({
                    goal: action.signupInfo.goal,
                    experience: action.signupInfo.experience,
                    weight: action.signupInfo.weight,
                    height: action.signupInfo.height
                })
                .end(function(err, resp) {
                    if (!err) {
                        next({
                            type: GAL_SIGNUP_COMPLETE
                        })
                    } else {
                        next({
                            type: FACEBOOK_LOGOUT
                        })
                    }
                })
            break
        case GAL_REMOVEACCOUNT:
            request
                .delete(constants.GAL_BACKEND_PROFILE_URL)
                .auth(action.userInfo.userid, action.userInfo.usertok)
                .end(function(err, resp) {
                    if (err) {
                        console.log(err)
                    } else {
                        next({
                            type: GAL_REMOVEACCOUNT_COMPLETE
                        })
                    }
                })
            break
        case GAL_GET_PROFILE:
            request
                .get(constants.GAL_BACKEND_PROFILE_URL)
                .auth(action.userInfo.userid, action.userInfo.usertok)
                .end(function(err, resp) {
                    if (!err) {
                        let profileInfo = JSON.parse(resp.text)
                        next({
                            type: GAL_GET_PROFILE_COMPLETE,
                            profileInfo: profileInfo
                        })
                    }
                    else {
                        console.log(err)
                    }
                })
            break
        case SELECT_WORKOUT_PROGRAM:
            request
                .get(constants.GAL_BACKEND_PROFILE_URL)
                .auth(action.userInfo.userid, action.userInfo.usertok)
                .end(function(err, resp) {
                    if (!err) {
                        let profileInfo = JSON.parse(resp.text)
                        
                        request
                            .patch(constants.GAL_BACKEND_PROFILE_URL)
                            .auth(action.userInfo.userid, action.userInfo.usertok)
                            .send({
                                goal: profileInfo.goal,
                                experience: profileInfo.experience,
                                weight: profileInfo.weight,
                                height: profileInfo.height,
                                current_workout_program: action.workoutId
                            })
                            .end(function(err, resp) {
                            })
                    }
                })
            
            let endpoint = `${constants.GAL_BACKEND_WORKOUT_URL}${action.workoutId}/`
            request
                .get(endpoint)
                .query('default')
                .auth(action.userInfo.userid, action.userInfo.usertok)
                .end(function(err, resp) {
                    if (err) {
                        console.log(err)
                    } else {
                        let programInfo = JSON.parse(resp.text)
                        next({
                            type: SELECT_WORKOUT_PROGRAM_COMPLETE,
                            programInfo: programInfo
                        })
                    }
                })
            break
        case COMPLETE_WORKOUT_PROGRAM:
            request
            .get(constants.GAL_BACKEND_PROFILE_URL)
            .auth(action.userInfo.userid, action.userInfo.usertok)
            .end(function(err, resp) {
                if (!err) {
                    let profileInfo = JSON.parse(resp.text)
                    
                    request
                        .patch(constants.GAL_BACKEND_PROFILE_URL)
                        .auth(action.userInfo.userid, action.userInfo.usertok)
                        .send({
                            goal: profileInfo.goal,
                            experience: profileInfo.experience,
                            weight: profileInfo.weight,
                            height: profileInfo.height,
                            current_workout_program: null
                        })
                        .end(function(err, resp) {
                        })
                }
            })
            break
        case SUBMIT_WORKOUT_DAY:
            for (var day_id in action.logs) {
                let body = {
                    workout_day: parseInt(day_id),
                    reps: action.logs[day_id]
                }

                request
                    .put(constants.GAL_BACKEND_WORKOUT_LOGS_URL)
                    .type('form')
                    .auth(action.userInfo.userid, action.userInfo.usertok)
                    .query("default")
                    .send(body)
                    .end(function(err, resp) {
                        if (err) {
                            console.log(err)
                        } else {
                            // console.log(resp)
                        }
                    })
            }
            
        break
    }
}

export default apiservice