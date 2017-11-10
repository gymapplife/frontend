import React, { Component } from 'react'
import { connect } from 'react-redux'
import workoutcomponent from '../components/Workout'

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        signedUp: state.signedUp
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const Workout = connect(
    mapStateToProps,
    mapDispatchToProps,
)(workoutcomponent)

export default Workout