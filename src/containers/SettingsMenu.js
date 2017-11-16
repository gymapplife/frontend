import React, { Component } from 'react'
import { connect } from 'react-redux'
import settingsmenucomponent from '../components/SettingsMenu'
import { facebookLogout, navigateTo } from '../actions'

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleLogout: () => {
            dispatch(facebookLogout())
        },
        handleNavigationClicked: (page) => {
            dispatch(navigateTo(page))
        }
    }
}

const SettingsMenu = connect(
    mapStateToProps,
    mapDispatchToProps,
)(settingsmenucomponent)

export default SettingsMenu