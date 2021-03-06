import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import {galSignup} from '../actions'
import { Redirect } from 'react-router-dom'
import '../components/App.css'

class SignupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fitnessGoalOption: "",
            experienceLevelOption: "",
            weight: '',
            height: '',
            showErr: false,
            fireRedirect: false
        }

        this.handleTextInputChange = this.handleTextInputChange.bind(this)
        this.handleFitnessGoalChange = this.handleFitnessGoalChange.bind(this)
        this.handleExperienceLevelChange = this.handleExperienceLevelChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleTextInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleFitnessGoalChange(event, index, value) {
        this.setState({
            fitnessGoalOption: value
        })
    }

    handleExperienceLevelChange(event, index, value) {
        this.setState({
            experienceLevelOption: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let verify = true
        if (!this.state.fitnessGoalOption) verify = false
        if (!this.state.experienceLevelOption) verify = false
        if (!this.state.weight) verify = false
        if (!this.state.height) verify = false

        if (!verify) {
            this.setState({showErr: true})
        } else {
            this.props.doSubmit(
                this.props.userFacebookInfo.id,
                this.props.userFacebookInfo.accessToken,
                this.state.fitnessGoalOption,
                this.state.experienceLevelOption,
                this.state.weight,
                this.state.height
            )
        }
    }

    handleReset() {
        this.setState({
            fitnessGoalOption: "",
            experienceLevelOption: "",
            weight: '',
            height: '',
            showErr: false,
        })
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        const form = (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <SelectField id="fitnessGoalOption" hintText="Fitness Goals" onChange={this.handleFitnessGoalChange}
                        value={this.state.fitnessGoalOption} errorText={!this.state.fitnessGoalOption && this.state.showErr && "Required"}>
                        <MenuItem value="STRENGTH_TRAINING" primaryText="Strength Training" />
                        <MenuItem value="LOSE_WEIGHT" primaryText="Weight Loss" />
                        <MenuItem value="CARDIO" primaryText="Cardio" />
                    </SelectField>
                </div>
                <div>
                    <SelectField id="experienceLevelOption" hintText="Experience Level" onChange={this.handleExperienceLevelChange}
                        value={this.state.experienceLevelOption} errorText={!this.state.experienceLevelOption && this.state.showErr && "Required"}>
                        <MenuItem value="NEW" primaryText="New" />
                        <MenuItem value="BEGINNER" primaryText="< 1 Year" />
                        <MenuItem value="NOVICE" primaryText="1 - 3 years" />
                        <MenuItem value="INTERMEDIATE" primaryText="3 - 5 years" />
                        <MenuItem value="ADVANCED" primaryText="5+" />
                    </SelectField>
                </div>
                <div>
                    <TextField name="weight" hintText="What is your weight (kg)?" onChange={this.handleTextInputChange}
                        value={this.state.weight} errorText={!this.state.weight && this.state.showErr && "Required"}/>
                </div>
                <div>
                    <TextField name="height" hintText="What is your height (cm)?" onChange={this.handleTextInputChange}
                        value={this.state.height} errorText={!this.state.height && this.state.showErr && "Required"}/>
                </div>
                <div>
                    <RaisedButton type="submit">Submit</RaisedButton>
                </div>
            </form>
        )

        if (this.props.loggedIn && !this.props.signedUp) {
            return (
                <div className="box">
                    <AppBar title="GymApp.life" className="header" />
                    <div className="content home-loggedout content--center">
                        <div className="home-loggedout--align">
                            <h2 className="helvetica-text">Welcome to GymApp.life!</h2>
                            {form}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <Redirect to="/" />
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        signedUp: state.signedUp,
        userFacebookInfo: state.userFacebookInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doSubmit: (userid, usertok, goal, experience, wieght, height) => {
            dispatch(galSignup(userid, usertok, goal, experience, wieght, height))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignupForm)
