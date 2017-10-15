import React, { Component } from 'react';
import Example from '../components/Example';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
    console.log(response);
}

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
                    appId="457054341361327"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.props.onFacebookLogin} />
            </div>
        )
    }
}

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            userInfo: {}
        }

        this.onFacebookLogin = this.onFacebookLogin.bind(this);
    }

    onFacebookLogin(response) {
        console.log(response);
        if (response.name) {
            this.setState({
                loggedIn: true,
                userInfo: {
                    userName: response.name,
                    userId: response.id,
                    userAccessToken: response.accessToken
                }
            })
        }
    }

    render() {
        const loggedIn = this.state.loggedIn;
        const userInfo = this.state.userInfo;
        return (
            <div>
                {/* <Example />
                <FacebookLogin
                    appId="457054341361327"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook} /> */}
                <Header 
                    loggedIn={loggedIn}
                    userInfo={userInfo}
                    onFacebookLogin={this.onFacebookLogin} />
            </div>
        )
    }
}