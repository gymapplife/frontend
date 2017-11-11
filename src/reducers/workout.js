import {
    SELECT_WORKOUT_PROGRAM_COMPLETE

} from "../actions"

export const workoutProgramInfo = (initialState = {}, action) => {
    switch(action.type) {
        case SELECT_WORKOUT_PROGRAM_COMPLETE:
            console.log("workout reduer received select workout program complete action", action.programInfo)
            return action.programInfo
            // return {word: 'hi'}
        default:
            return initialState
    }
}

export const submitted = (initialState = [], action) => {
    switch(action.type) {

    }
}