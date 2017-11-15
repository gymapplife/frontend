import React, { Component } from 'react'
import { connect } from 'react-redux'
import updateprofileformcomponent from '../components/UpdateProfileForm'
import { galUpdateProfile } from '../actions'

const mapStateToProps = state => {
    return {
        userFacebookInfo: state.userFacebookInfo,
        userProfile: state.userProfileInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doSubmit: (userid, usertok, goal, experience, wieght, height) => {
            dispatch(galUpdateProfile(userid, usertok, goal, experience, wieght, height))
        }
    }
}

const UpdateProfileForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(updateprofileformcomponent)

export default UpdateProfileForm