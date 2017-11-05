import request from 'superagent'
import {
    FACEBOOK_LOGOUT,
    GAL_SIGNUP,
    GAL_SIGNUP_COMPLETE,
    GAL_REMOVEACCOUNT,
    GAL_REMOVEACCOUNT_COMPLETE,
} from '../actions'

const apiservice = store => next => action => {
    // Pass all actions througt by default
    next(action);
    switch (action.type) {
        case GAL_SIGNUP:
            console.log("middleware sending create account request to backend.");
            console.log(action.signupInfo);
            request
                .post('http://ec2-54-237-141-145.compute-1.amazonaws.com/v1/profile/')
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
            console.log("middleware sending remove account request to backend");
            console.log(action.userInfo)
            request
                .delete('http://ec2-54-237-141-145.compute-1.amazonaws.com/v1/profile/')
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
    }
}

export default apiservice