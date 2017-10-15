import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FacebookLogin from 'react-facebook-login'
import * as constants from '../constants'

const Header = ({ loggedIn, userInfo, handleFacebookResponse }) => {
    const newUserGreeting = <h1>Welcome!</h1>
    const returningUserGreeting = <h1>Welcome back, {userInfo.name}!</h1>

    if (loggedIn) {
        return (
            <div>
                {returningUserGreeting}
            </div>
        )
    }

    return (
        <div>
            {newUserGreeting}
            <FacebookLogin
                appId={constants.FACEBOOK_APP_ID}
                autoLoad={false}
                fields={constants.FACEBOOK_FIELDS}
                callback={handleFacebookResponse} />
        </div>
    )
}

Header.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    userInfo: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        accessToken: PropTypes.string,
    }),
    handleFacebookResponse: PropTypes.func.isRequired,
}

export default Header
