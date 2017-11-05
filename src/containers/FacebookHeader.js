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
                .set('Accept', 'text/html')
                .auth(response.id, response.accessID)
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
        handleRemoveAccount: (userid, usertok) => {
            dispatch(galRemoveAccount(userid, usertok));
        }
    }
}

const FacebookHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header)

export default FacebookHeader
