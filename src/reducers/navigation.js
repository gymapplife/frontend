import {
    NAVIGATE_TO_PAGE,
    FACEBOOK_LOGIN
} from "../actions"

export const currentPage = (initialState = "", action) => {
    switch (action.type) {
        case NAVIGATE_TO_PAGE:
            return action.to
        case FACEBOOK_LOGIN:
            return "profile"
        default:
            return initialState
    }
}