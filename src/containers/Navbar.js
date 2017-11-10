import navbarcomponent from '../components/Navbar'
import { facebookLogout, navigateTo } from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        signedUp: state.signedUp
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleNavigationClicked: (page) => {
            dispatch(navigateTo(page))
        },
        handleLogout: () => {
            dispatch(facebookLogout());
        }
    }
}

const Navbar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(navbarcomponent)

export default Navbar