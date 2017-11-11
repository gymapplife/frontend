import React, { Component } from 'react'
import { connect } from 'react-redux'
import profilecomponent from '../components/Profile'
import { facebookLogout, galRemoveAccount, galGetProfile } from '../actions'

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        signedUp: state.signedUp,
        userInfo: state.userFacebookInfo,
        userProfile: state.userProfileInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleLogout: () => {
            dispatch(facebookLogout())
        },
        handleRemoveAccount: (userid, usertok) => {
            dispatch(galRemoveAccount(userid, usertok))
        },
        getProfileInfo: (userid, usertok) => {
            dispatch(galGetProfile(userid, usertok))
        }
    }
}

const Profile = connect(
    mapStateToProps,
    mapDispatchToProps,
)(profilecomponent)

export default Profile