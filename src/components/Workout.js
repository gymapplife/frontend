import React, { Component } from 'react'
import {Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import request from 'superagent'
import * as constants from '../constants'
import SelectWorkoutTable from './SelectWorkoutTable'
import LogWorkoutForm from './LogWorkoutForm'
import CustomWorkoutForm from './CustomWorkoutForm'

class Workout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            defaultWorkoutList: [],
            defaultSelected: [-1],
            customWorkoutList: [],
            customSelected: [-1],
            creatingCustom: false
        }

        this.fetchWorkouts = this.fetchWorkouts.bind(this)
        this.handleDefaultSelection = this.handleDefaultSelection.bind(this)
        this.handleCustomSelection = this.handleCustomSelection.bind(this)
        this.handleSelectDefaultWorkout = this.handleSelectDefaultWorkout.bind(this)
        this.handleSelectCustomWorkout = this.handleSelectCustomWorkout.bind(this)
        this.handleDeleteCustomWorkout = this.handleDeleteCustomWorkout.bind(this)
        this.handleRemoveWorkoutFromList = this.handleRemoveWorkoutFromList.bind(this)
        this.handleCompleteWorkout = this.handleCompleteWorkout.bind(this)
        this.handleSubmitLog = this.handleSubmitLog.bind(this)
        this.handleExitCustomWorkout = this.handleExitCustomWorkout.bind(this)
        this.handleNewCustomWorkout = this.handleNewCustomWorkout.bind(this)
    }

    fetchWorkouts(err, resp) {
        if (err) {
            console.log(err)
        } else {
            let obj = JSON.parse(resp.text)
            this.setState({defaultWorkoutList: obj.default})
            this.setState({customWorkoutList: obj.custom})
        }
    }

    handleDefaultSelection(selection) {
        if (selection.length == 1) {
            this.setState({defaultSelected: selection})
        }
    }

    handleCustomSelection(selection) {
        if (selection.length == 1) {
            this.setState({ customSelected: selection})
        }
    }

    handleSelectDefaultWorkout() {
        let idx = this.state.defaultSelected[0]
        let id = this.state.defaultWorkoutList[idx].id
        this.props.handleSelectWorkoutProgram(id, false, this.props.userInfo.id, this.props.userInfo.accessToken)
    }

    handleSelectCustomWorkout() {
        let idx = this.state.customSelected[0]
        if (idx < this.state.customWorkoutList.length) {
            let id = this.state.customWorkoutList[idx].id
            this.props.handleSelectWorkoutProgram(id, true, this.props.userInfo.id, this.props.userInfo.accessToken)
        } else {
            this.setState({creatingCustom: true})
        }
    }

    handleDeleteCustomWorkout() {
        let idx = this.state.customSelected[0]
        let id = this.state.customWorkoutList[idx].id

        request
            .delete(constants.GAL_BACKEND_WORKOUT_URL + id + '/')
            .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
            .end(this.handleRemoveWorkoutFromList)

        let newlist = this.state.customWorkoutList.slice()
        newlist.splice(idx, 1)
        this.setState({customWorkoutList: newlist})
    }

    handleRemoveWorkoutFromList(err, resp) {
        if (err) {
            console.log(err)
        } else {
        }
    }

    handleCompleteWorkout() {
        this.props.handleCompleteWorkoutProgram(this.props.userInfo.id, this.props.userInfo.accessToken)
    }

    handleSubmitLog(logs, wd) {
        this.props.submitWorkDay(logs, wd, this.props.userInfo.id, this.props.userInfo.accessToken)
    }

    handleExitCustomWorkout() {
        this.setState({creatingCustom: false})
    }

    handleNewCustomWorkout(program) {
        let newlist = this.state.customWorkoutList.slice()
        newlist.push(program)
        this.setState({customWorkoutList: newlist, creatingCustom: false})
    }

    componentDidMount() {
        request
        .get(constants.GAL_BACKEND_WORKOUT_URL)
        .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
        .end(this.fetchWorkouts)
    }

    render() {
        const defaultWorkouts = this.state.defaultWorkoutList
        const customWorkouts = this.state.customWorkoutList
        let content

        if (this.props.userProfile.current_workout_program === null) {
            if (!this.state.creatingCustom) {
                content = (
                <div className="content--center">
                    <h1> Choose a workout. </h1>
                    <h2> Default workouts </h2>
                    <SelectWorkoutTable
                        workouts={defaultWorkouts}
                        handleSelection={this.handleDefaultSelection}
                        selected={this.state.defaultSelected}
                        isCustom={false}
                    /><br /><br />
                    <RaisedButton onClick={this.handleSelectDefaultWorkout}> Continue </RaisedButton><br /><br />

                    <h2> Custom workouts </h2>
                    <SelectWorkoutTable
                        workouts={customWorkouts}
                        handleSelection={this.handleCustomSelection}
                        selected={this.state.customSelected}
                        isCustom={true}
                    />
                    <RaisedButton onClick={this.handleSelectCustomWorkout}> Continue </RaisedButton><br /><br />
                    <RaisedButton
                        onClick={this.handleDeleteCustomWorkout}
                        disabled={this.state.customSelected[0] == this.state.customWorkoutList.length || this.state.customWorkoutList.length == 0}
                    > Delete </RaisedButton><br /><br />
                </div>
                )
            } else {
                content = (
                    <div className="content--center">
                        <CustomWorkoutForm
                            userInfo={this.props.userInfo}
                            completeForm={this.handleNewCustomWorkout}
                        />
                        <RaisedButton onClick={this.handleExitCustomWorkout}> Cancel </RaisedButton>
                    </div>
                )
            }

        }
        else if (!this.props.workoutProgramInfo.program) {
            content = (
                <div> Loading </div>
            )
            this.props.handleSelectWorkoutProgram (
                this.props.userProfile.current_workout_program,
                this.props.userInfo.id,
                this.props.userInfo.accessToken
            )
        } else {
            content = (
                <div className="content--center">
                    {<LogWorkoutForm
                        programInfo={this.props.workoutProgramInfo}
                        userInfo={this.props.userInfo}
                        handleSubmitLog={this.handleSubmitLog}
                        submittedDays={this.props.submittedDays}
                    />}<br /><br />
                    <RaisedButton className="long-btn" onClick={this.handleCompleteWorkout}> Choose Another Workout </RaisedButton><br /><br />
                </div>
            )
        }

        return content
    }

}

export default Workout
