import React, { Component } from 'react';
import Header from './Header'

const responseFacebook = (response) => {
    console.log(response);
}

class App extends Component {
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
                <Header
                    loggedIn={loggedIn}
                    userInfo={userInfo}
                    onFacebookLogin={this.onFacebookLogin} />
            </div>
        )
    }
}

export default App
