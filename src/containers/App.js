import appcomponent from '../components/App'
import { connect } from 'react-redux'
import { facebookLogout } from '../actions'

const mapStateToProps = state => {
    return {
        userInfo: state.userFacebookInfo,
        loggedIn: state.loggedIn,
        signedUp: state.signedUp,
        currentPage: state.currentPage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleLogout: () => {
            dispatch(facebookLogout())
        }
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(appcomponent)

export default App