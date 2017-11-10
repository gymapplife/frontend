import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FacebookLogin from 'react-facebook-login'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import * as constants from '../constants'
import { Redirect } from 'react-router-dom'

const Header = ({ loggedIn, signedUp, userInfo, handleFacebookResponse, handleLogout, handleRemoveAccount }) => {
    return (
        <Card>
            <CardTitle title="Welcome!" />
            <CardText>
                <FacebookLogin
                    appId={constants.FACEBOOK_APP_ID}
                    autoLoad={false}
                    fields={constants.FACEBOOK_FIELDS}
                    callback={handleFacebookResponse} />
            </CardText>
        </Card>
    )
}

Header.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    signedUp: PropTypes.bool.isRequired,
    userInfo: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        accessToken: PropTypes.string,
    }),
    handleFacebookResponse: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    handleRemoveAccount: PropTypes.func.isRequired,
}

export default Header
