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
            defaultInfo: {
                workoutList: [],
                selected: [-1]
            },
            customInfo: {
                workoutList: [],
                selected: [-1]
            },
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
    }

    fetchWorkouts(err, resp) {
        if (err) {
            console.log(err)
        } else {
            let obj = JSON.parse(resp.text)
            let newDefaultInfo = Object.assign({}, this.state.defaultInfo, {workoutList: obj.default})
            this.setState({defaultInfo: newDefaultInfo})

            let newCustomInfo = Object.assign({}, this.state.customInfo, {workoutList: obj.custom})
            this.setState({customInfo: newCustomInfo})
        }
    }

    handleDefaultSelection(selection) {
        if (selection.length == 1) {
            let newDefaultInfo = Object.assign({}, this.state.defaultInfo, {selected: selection})
            this.setState({
                defaultInfo: newDefaultInfo
            })
        }
    }
    
    handleCustomSelection(selection) {
        if (selection.length == 1) {
            let newCustomInfo = Object.assign({}, this.state.customInfo, {selected: selection})
            this.setState({
                customInfo: newCustomInfo
            })
        }
    }

    handleSelectDefaultWorkout() {
        let idx = this.state.defaultInfo.selected[0]
        let id = this.state.defaultInfo.workoutList[idx].id
        this.props.handleSelectWorkoutProgram(id, false, this.props.userInfo.id, this.props.userInfo.accessToken)
    }

    handleSelectCustomWorkout() {
        let idx = this.state.customInfo.selected[0]
        if (idx < this.state.customInfo.workoutList.length) {
            let id = this.state.customInfo.workoutList[idx].id
            this.props.handleSelectWorkoutProgram(id, true, this.props.userInfo.id, this.props.userInfo.accessToken)
        } else {
            this.setState({creatingCustom: true})
        }
    }

    handleDeleteCustomWorkout() {
        let idx = this.state.customInfo.selected[0]
        let id = this.state.customInfo.workoutList[idx].id

        console.log("deleting custom workout id ", id)

        request
            .delete(constants.GAL_BACKEND_WORKOUT_URL + id + '/')
            .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
            .end(this.handleRemoveWorkoutFromList)

        let newlist = this.state.customInfo.workoutList.slice()
        console.log("before", newlist)
        newlist.splice(idx, 1)
        console.log("after", newlist)
        let newCustomInfo = Object.assign({}, this.state.customInfo, {workoutlist: newlist})
        this.setState({customInfo: newCustomInfo})
    }

    handleRemoveWorkoutFromList(err, resp) {
        if (err) {
            console.log(err)
        } else {
            console.log(resp)
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

    componentDidMount() {
        request
        .get(constants.GAL_BACKEND_WORKOUT_URL)
        .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
        .end(this.fetchWorkouts) 
    }

    render() {
        const defaultWorkouts = this.state.defaultInfo.workoutList
        const customWorkouts = this.state.customInfo.workoutList
        let content

        if (this.props.userProfile.current_workout_program === null) {
            if (!this.state.creatingCustom) {
                content = (
                <div>
                    <h1> Choose a workout. </h1>
                    <h2> Default workouts </h2>
                    <SelectWorkoutTable 
                        workouts={defaultWorkouts}
                        handleSelection={this.handleDefaultSelection}
                        selected={this.state.defaultInfo.selected}
                        isCustom={false}
                    />
                    <RaisedButton onClick={this.handleSelectDefaultWorkout}> Continue </RaisedButton>

                    <h2> Custom workouts </h2>
                    <SelectWorkoutTable
                        workouts={customWorkouts}
                        handleSelection={this.handleCustomSelection}
                        selected={this.state.customInfo.selected}
                        isCustom={true}
                    />
                    <RaisedButton onClick={this.handleSelectCustomWorkout}> Continue </RaisedButton>
                    <RaisedButton onClick={this.handleDeleteCustomWorkout}> Delete </RaisedButton>
                </div>
                )
            } else {
                content = (
                    <div>
                        <CustomWorkoutForm 
                            userInfo={this.props.userInfo}
                            completeForm={this.handleExitCustomWorkout}
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
                <div>
                    {<LogWorkoutForm 
                        programInfo={this.props.workoutProgramInfo}
                        userInfo={this.props.userInfo}
                        handleSubmitLog={this.handleSubmitLog}
                        submittedDays={this.props.submittedDays}
                    />}
                    <RaisedButton onClick={this.handleCompleteWorkout}> Choose Another Workout </RaisedButton>
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