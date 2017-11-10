import React, { Component } from 'react'
import { connect } from 'react-redux'
import photoscomponent from '../components/Photos'

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        signedUp: state.signedUp
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const Photos = connect(
    mapStateToProps,
    mapDispatchToProps,
)(photoscomponent)

export default Photos