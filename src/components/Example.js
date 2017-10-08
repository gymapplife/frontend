import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from '../actions/ExampleActions';

class Example extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        if (this.props.isLoading) {
            return <div>Loading..</div>
        }

        return (
            <div>{this.props.data.example}</div>
        )
    }
}

Example.propTypes = {
    fetchData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        data: state.example.data,
        isLoading: state.example.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Example)