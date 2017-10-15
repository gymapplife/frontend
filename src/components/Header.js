import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import * as constants from '../constants'

class Header extends Component {
    constructor(props) {
        super(props)
        this.onLoginClicked = this.onLoginClicked.bind(this);
    }

    onLoginClicked() {

    }

    render() {
        const newUserGreeting = <h1> Welcome! </h1>
        const returningUserGreeting = <h1> Welcome back, {this.props.userInfo.userName}! </h1>

        if (this.props.loggedIn) {
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
                    appId="{constants.FACEBOOK_APP_ID}"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.props.onFacebookLogin} />
            </div>
        )
    }
}

export default Header
