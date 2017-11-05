import { connect } from 'react-redux'
import Header from '../components/Header'
import { facebookLogin, facebookLogout, galRemoveAccount } from '../actions'
import request from 'superagent'

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        signedUp: state.signedUp,
        userInfo: state.userFacebookInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleFacebookResponse: response => {
            console.log(response);
            request
                .get("http://ec2-54-237-141-145.compute-1.amazonaws.com/v1/profile/")
                // .set('X-CSRFToken', 'wQ1hh4q5DrIiriao8gfr5LiUwvoQig3LXxtcni8hg9jhTkoJmry0fGXgc2BiWGDG')
                .set('Accept', 'text/html')
                .auth('10203853660538839', 'EAAGfsEGo7q8BAKtdGmrnVZAmoUzHCD51DbPjZC2yDLxskEWJUaM25k5EJIZCneq5sJCyM0Lh3rtrvzWk6EMDZBRsiUpZAhH4dCg3YxiS6gGfMyeQEt01bCC2dUzzLv8FRcGOwEtyp56IPWupjwuDOLMyAj3wZBmHkGVQZA6y7NAu5SY3P7GHVtHuWn0jkriwUS6zW2uzmSGpgZDZD')
                .end(function(err, res) {
                    console.log(res.status)
                    if (err && res.status === 403) {
                        console.log("redirect to signup")
                    }
                })
            dispatch(facebookLogin(response));
        },
        handleLogout: () => {
            dispatch(facebookLogout());
        },
        handleRemoveAccount: () => {
            dispatch(galRemoveAccount());
        }
    }
}

const FacebookHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header)

export default FacebookHeader
