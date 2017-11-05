import { connect } from 'react-redux'
import Header from '../components/Header'
import { facebookLogin, facebookLogout, galRemoveAccount } from '../actions'
import request from 'superagent'
import * as constants from '../constants'

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
            request
                .get(constants.GAL_BACKEND_URL)
                .set('Accept', 'text/html')
                .auth(response.id, response.accessID)
                .end(function(err, res) {
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
