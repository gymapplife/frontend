import React, { Component } from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import request from 'superagent'
import * as constants from '../constants'


class ExerciseBar extends React.Component {
    constructor(props) {
        super(props)

        this.handleExChange = this.handleExChange.bind(this)
        this.handleSetsChange = this.handleSetsChange.bind(this)
        this.handleRepsChange = this.handleRepsChange.bind(this)
        this.handleWeightChange = this.handleWeightChange.bind(this)
    }

    handleExChange(event, index, value) {
        this.props.handleExChange(this.props.itemIdx, value)
    }

    handleSetsChange(event) {
        this.props.handleSetsChange(this.props.itemIdx, event.target.value)
    }

    handleRepsChange(event) {
        this.props.handleRepsChange(this.props.itemIdx, event.target.value)
    }

    handleWeightChange(event) {
        this.props.handleWeightChange(this.props.itemIdx, event.target.value)
    }

    render() {
        return(
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <DropDownMenu value={this.props.selectedExId} onChange={this.handleExChange}>
                        {this.props.allex.map((ex, idx) => (
                            <MenuItem key={idx} value={ex.id} primaryText={ex.name}/>
                        ))}
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <TextField floatingLabelText="Sets" value={this.props.setsValue} onChange={this.handleSetsChange}
                    errorText={(!this.props.setsValue || isNaN(this.props.setsValue)) && this.props.showErr && "Invalid"}/>
                    <TextField floatingLabelText="Reps" value={this.props.repsValue} onChange={this.handleRepsChange}
                    errorText={(!this.props.repsValue || isNaN(this.props.repsValue)) && this.props.showErr && "Invalid"}/>
                    <TextField floatingLabelText="Weight" value={this.props.weightValue} onChange={this.handleWeightChange}
                    errorText={(!this.props.weightValue || isNaN(this.props.weightValue)) && this.props.showErr && "Invalid"}/>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

class CustomWorkoutForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            numExercises: 1,
            exfields: [{
                selectedExId: 0,
                sets: 1, 
                reps: 1,
                weight: 20
            }], 
            exname: "Custom Exercise",
            showErr: false,
            allex: []
        }

        this.getAllWorkouts = this.getAllWorkouts.bind(this)
        this.handleAddExercise = this.handleAddExercise.bind(this)
        this.handlExChange = this.handlExChange.bind(this)
        this.handleSetsChange = this.handleSetsChange.bind(this)
        this.handleRepsChange = this.handleRepsChange.bind(this)
        this.handleWeightChange = this.handleWeightChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleCompleteForm = this.handleCompleteForm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        request
            .get(constants.GAL_BACKEND_EXERSISE_URL)
            .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
            .end(this.getAllWorkouts)
    }

    getAllWorkouts(err, resp) {
        if (err) {
            console.log(err)
        } else {
            let allex = JSON.parse(resp.text)
            this.setState({allex: allex})
        }
    }

    handleAddExercise() {
        var curEx = this.state.numExercises
        curEx += 1
        this.setState({numExercises: curEx})

        this.setState({
            exfields: [...this.state.exfields, {
                selectedExId: 0,
                sets: 1, 
                reps: 1,
                weight: 20
            }]
        })


    }

    handlExChange(k, newEx) {
        let newfields = this.state.exfields
        newfields[k].selectedExId = newEx
        this.setState({exfields: newfields})
    }

    handleSetsChange(k, newSets) {
        let newfields = this.state.exfields
        newfields[k].sets = newSets
        this.setState({exfields: newfields})
    }

    handleRepsChange(k, newReps) {
        let newfields = this.state.exfields
        newfields[k].reps = newReps
        this.setState({exfields: newfields})
    }

    handleWeightChange(k, newWeight) {
        let newfields = this.state.exfields
        newfields[k].weight = newWeight
        this.setState({exfields: newfields})
    }

    handleNameChange(event) {
        this.setState({exname: event.target.value})
    }

    handleCompleteForm(err, resp) {
        if (err) {
            console.log(err)
        } else {
            let obj = JSON.parse(resp.text)
            this.props.completeForm(obj.program)
        }
    }

    handleSubmit() {
        let verify = true
        if(!this.state.exname) verify = false
        for (var i=0; i<this.state.numExercises; i++) {
            var curReps = this.state.exfields[i].reps
            var curSets = this.state.exfields[i].sets
            var curWeight = this.state.exfields[i].weight
            if(!curReps || isNaN(curReps)) verify = false
            if(!curSets || isNaN(curSets)) verify = false
            if(!curWeight || isNaN(curWeight)) verify = false
        }

        if (!verify) {
            this.setState({showErr: true})
        } else {
            let days = []
            for (var i=0; i<this.state.numExercises; i++) {
                let exinfo = this.state.exfields[i]
                days.push({
                    week:1,
                    day:1,
                    exercise: exinfo.selectedExId,
                    sets: exinfo.sets,
                    reps: exinfo.reps,
                    weight: exinfo.weight
                })
            }

            let body = {
                name: this.state.exname,
                days: JSON.stringify(days)
            }

            request
                .post(constants.GAL_BACKEND_WORKOUT_URL)
                .type('form')
                .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
                .send(body)
                .end(this.handleCompleteForm)
        }
    }

    render() {
        let exbars = []
        for (var i=0; i<this.state.numExercises; i++) {
            exbars.push(
                <ExerciseBar
                    key={i}
                    itemIdx={i}
                    allex={this.state.allex}
                    showErr={this.state.showErr}
                    selectedExId={this.state.exfields[i].selectedExId}
                    setsValue={this.state.exfields[i].sets}
                    repsValue={this.state.exfields[i].reps}
                    weightValue={this.state.exfields[i].weight}
                    handleExChange={this.handlExChange}
                    handleSetsChange={this.handleSetsChange}
                    handleRepsChange={this.handleRepsChange}
                    handleWeightChange={this.handleWeightChange}
                />
            )
        }

        return (
            <div>
                <h1> Customize Workout </h1>
                <TextField hintText="Name" value={this.state.exname} onChange={this.handleNameChange}
                errorText={!this.state.exname && this.state.showErr && "Required"}/>
                {exbars}
                <RaisedButton onClick={this.handleAddExercise}> Add Exercise </RaisedButton>
                <RaisedButton onClick={this.handleSubmit}> Submit </RaisedButton>
            </div>
        )
    }
}

export default CustomWorkoutForm