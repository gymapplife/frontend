import { connect } from 'react-redux'
import Header from '../components/Header'
import { facebookLogin } from '../actions'

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

const FacebookHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header)

export default FacebookHeader
