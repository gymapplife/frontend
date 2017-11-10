import React, { Component } from 'react'
import { connect } from 'react-redux'
import profilecomponent from '../components/Profile'
import { facebookLogout, galRemoveAccount } from '../actions'

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        signedUp: state.signedUp,
        userInfo: state.userFacebookInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleLogout: () => {
            dispatch(facebookLogout());
        },
        handleRemoveAccount: (userid, usertok) => {
            dispatch(galRemoveAccount(userid, usertok))
        }
    }
}

const Profile = connect(
    mapStateToProps,
    mapDispatchToProps,
)(profilecomponent)

export default Profile