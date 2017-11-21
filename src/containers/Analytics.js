import React, { Component } from 'react'
import { connect } from 'react-redux'
import analyticscomponent from '../components/Analytics'

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        signedUp: state.signedUp,
        userInfo: state.userFacebookInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const Analytics = connect(
    mapStateToProps,
    mapDispatchToProps,
)(analyticscomponent)

export default Analytics