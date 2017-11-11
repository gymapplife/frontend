import React, { Component } from 'react'
import { connect } from 'react-redux'
import workoutcomponent from '../components/Workout'
import { selectWorkoutProgram, completeWorkoutProgram, submitWorkDay } from '../actions'

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        signedUp: state.signedUp,
        userProfile: state.userProfileInfo,
        userInfo: state.userFacebookInfo,
        workoutProgramInfo: state.workoutProgramInfo,
        submittedDays: state.submitted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSelectWorkoutProgram: (workoutid, userid, usertok) => {
            dispatch(selectWorkoutProgram(workoutid, userid, usertok))
        },
        handleCompleteWorkoutProgram: (userid, usertok) => {
            dispatch(completeWorkoutProgram(userid, usertok))
        },
        submitWorkDay: (logs, wd) => {
            dispatch(submitWorkDay(logs, wd))
        }
    }
}

const Workout = connect(
    mapStateToProps,
    mapDispatchToProps,
)(workoutcomponent)

export default Workout