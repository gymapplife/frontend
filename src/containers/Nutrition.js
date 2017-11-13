import React, { Component } from 'react'
import { connect } from 'react-redux'
import nutritioncomponent from '../components/Nutrition'

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        signedUp: state.signedUp,
        userInfo: state.userFacebookInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const Nutrition = connect(
    mapStateToProps,
    mapDispatchToProps,
)(nutritioncomponent)

export default Nutrition