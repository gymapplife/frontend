import React, { Component } from 'react'
import {Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import request from 'superagent'
import * as constants from '../constants'
import SelectWorkoutTable from './SelectWorkoutTable'

class Workout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultWorkouts: [],
            selected: [-1]
        }

        this.fetchDefaultWorkouts = this.fetchDefaultWorkouts.bind(this)
        this.handleSelection = this.handleSelection.bind(this)
        this.handleSelectWorkout = this.handleSelectWorkout.bind(this)
        this.handleCompleteWorkout = this.handleCompleteWorkout.bind(this)
    }

    fetchDefaultWorkouts(err, resp) {
        if (err) {
            console.log(err)
        } else {
            let dw = JSON.parse(resp.text).default
            this.setState({defaultWorkouts:dw})
        }
    }

    handleSelection(selection) {
        if (selection.length == 1) {
            this.setState({
                selected: selection
            })
        }
    }

    handleSelectWorkout() {
        let idx = this.state.selected[0]
        let id = this.state.defaultWorkouts[idx].id
        this.props.handleSelectWorkoutProgram(id, this.props.userInfo.id, this.props.userInfo.accessToken)
    }

    handleCompleteWorkout() {
        this.props.handleCompleteWorkoutProgram(this.props.userInfo.id, this.props.userInfo.accessToken)
    }

    componentWillMount() {
        request
        .get(constants.GAL_BACKEND_WORKOUT_URL)
        .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
        .end(this.fetchDefaultWorkouts) 
    }

    render() {
        const defaultWorkouts = this.state.defaultWorkouts
        let content

        if (this.props.userProfile.current_workout_program === null) {
            content = (
                <div>
                    <h1> Choose a workout. </h1>
                    <SelectWorkoutTable 
                        workouts={defaultWorkouts}
                        handleSelection={this.handleSelection}
                        selected={this.state.selected}
                    />
                    <RaisedButton onClick={this.handleSelectWorkout}> Continue </RaisedButton>
                </div>
            )
        } else {
            content = (
                <div>
                    Current workout.
                    <RaisedButton onClick={this.handleCompleteWorkout}> (For debug) Complete </RaisedButton>
                </div>
            )
        }

        return (
            <Card>
                {content}
            </Card>
        )
    }

}

export default Workout