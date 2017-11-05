import request from 'superagent'
import {
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
            next({
                type: GAL_SIGNUP_COMPLETE
            })
            break
        case GAL_REMOVEACCOUNT:
            console.log("middleware sending remove account request to backend");
            next({
                type: GAL_REMOVEACCOUNT_COMPLETE
            })
    }
}

export default apiservice