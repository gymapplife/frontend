import {
    SELECT_WORKOUT_PROGRAM_COMPLETE,
    SUBMIT_WORKOUT_DAY,
    COMPLETE_WORKOUT_PROGRAM,
} from "../actions"

export const workoutProgramInfo = (initialState = {}, action) => {
    switch(action.type) {
        case SELECT_WORKOUT_PROGRAM_COMPLETE:
            return action.programInfo
        default:
            return initialState
    }
}

export const submitted = (initialState = [], action) => {
    switch(action.type) {
        case SUBMIT_WORKOUT_DAY:
            let nextstate = initialState.slice()
            nextstate.push(action.workday)
            return nextstate
        case COMPLETE_WORKOUT_PROGRAM:
            return []
        default:
            return initialState
    }
}