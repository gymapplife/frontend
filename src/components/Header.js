import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FacebookLogin from 'react-facebook-login'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import * as constants from '../constants'
import { Redirect } from 'react-router-dom'

const Header = ({ loggedIn, signedUp, userInfo, handleFacebookResponse, handleLogout, handleRemoveAccount }) => {
    const loggedOutUser = (
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
    const newUser = (
        <Redirect to="/signup" />
    )
    const returningUser = (
        <Card>
            <CardTitle title={`Welcome back, ${userInfo.name}!`} />
            <CardText>
                <table><tr>
                    <td><RaisedButton onClick={handleLogout}>
                        Logout
                    </RaisedButton></td>
                    <td><RaisedButton onClick={handleRemoveAccount}>
                        Remove Account
                    </RaisedButton></td>
                </tr></table>
            </CardText>
        </Card>
    )

    if (loggedIn) {
        if (signedUp) {
            return returningUser
        } else {
            return newUser
        }
    } else {
        return loggedOutUser
    }
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
