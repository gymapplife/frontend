import React, { Component } from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import * as constants from '../constants'
import { facebookLogin } from '../actions'

class Header extends Component {
    render() {
        const newUserGreeting = <h1>Welcome!</h1>
        const returningUserGreeting = <h1>Welcome back, {this.props.userInfo.name}!</h1>

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
                    appId={constants.FACEBOOK_APP_ID}
                    autoLoad={false}
                    fields={constants.FACEBOOK_FIELDS}
                    callback={this.props.handleFacebookResponse} />
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    userInfo: state.userInfo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleFacebookResponse: response => {
      console.log(response)
      dispatch(facebookLogin(response))
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
