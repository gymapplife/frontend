import appcomponent from '../components/App'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        signedUp: state.signedUp,
        currentPage: state.currentPage,
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(appcomponent)

export default App