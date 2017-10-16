import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FacebookLogin from 'react-facebook-login'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import * as constants from '../constants'

const Header = ({ loggedIn, userInfo, handleFacebookResponse }) => {
    const newUser = (
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
    const returningUser = (
        <Card>
            <CardTitle title={`Welcome back, ${userInfo.name}!`} />
        </Card>
    )

    return loggedIn ? returningUser : newUser
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
