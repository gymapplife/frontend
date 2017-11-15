import {
    NAVIGATE_TO_PAGE,
    FACEBOOK_LOGIN,
    GAL_UPDATE_PROFILE_COMPLETE
} from "../actions"

export const currentPage = (initialState = "", action) => {
    switch (action.type) {
        case NAVIGATE_TO_PAGE:
            return action.to
        case FACEBOOK_LOGIN:
        case GAL_UPDATE_PROFILE_COMPLETE:
            return "profile"
        default:
            return initialState
    }
}