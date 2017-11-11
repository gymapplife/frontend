import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu';
import {GridList, GridTile} from 'material-ui/GridList';
import MenuItem from 'material-ui/MenuItem';
import * as constants from '../constants'
import request from 'superagent'

class ERow extends React.Component {
    constructor(props) {
        super(props)
        let initValues = []
        for (let i=0; i<this.props.sets; i++) {
            initValues.push(this.props.reps)
        }
        this.state = {
            values: initValues
        }

        this.handleCellSelect = this.handleCellSelect.bind(this)
    }

    handleCellSelect(event, index, value, set) {
        let s = this.state.values.slice()
        s[set] = value
        console.log(this.props)
        let d = {
            workoutDayId: this.props.workoutDayId,
            repstring: s.join(",")
        }
        this.props.handleRepsChange(d)
        this.setState({values: s})
    }

    componentWillReceiveProps() {
        console.log("Erow wcp ", this.props.sets, " ", this.props.reps)
        // let initValues = []
        // for (let i=0; i<this.props.sets; i++) {
        //     initValues.push(this.props.reps)
        // }
        // this.setState({values: initValues})
    }

    render() {
        const sets = this.props.sets
        const reps = this.props.reps
        let s, r
        let eRow = []
        for (s=0; s<sets; s++) {
            let repChoices = []
            for (r=0; r<=reps; r++) {
                repChoices.push(<MenuItem key={r} value={r} primaryText={r}></MenuItem>)
            }
            // Just saying, this closure is the most disgusting thing i've had to write ever.
            eRow.push(
                <GridTile key={s}>
                    <DropDownMenu value={this.state.values[s]} onChange={(() => {var cs = s; return(e, i, v) => this.handleCellSelect(e, i, v, cs)})()}>
                        {repChoices}
                    </DropDownMenu>
                </GridTile>
            )
        }

        return (
            <GridList cols={sets}>
                {eRow}
            </GridList>
        )
    }
}

class LogWorkoutForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.programInfo)
        let initialLog = []


        this.state = {
            wd: 'w,1,d,1',
            exercises: []
        }

        this.logs = {}

        this.handleWDSelect = this.handleWDSelect.bind(this)
        this.handleRepsChange = this.handleRepsChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.alreadySubmitted = this.alreadySubmitted.bind(this)
    }

    handleWDSelect(event, index, value) {
        console.log("select wd")

        // Reset logs
        let k = value.split(",")
        let week, day
        week = k[1]
        day = k[3]
        let exercises = this.props.programInfo.weeks[week][day]
        this.logs = {}
        for (let i=0; i<exercises.length; i++) {
            let exercise = exercises[i]
            let l = []
            for (let s=0; s<exercise.sets; s++) {
                l.push(exercise.reps)
            }
            this.logs[exercise.id.toString()] = l.join(",")
        }

        this.setState({wd: value})
    }

    handleSubmit() {
        this.props.handleSubmitLog(this.logs)
    }

    handleRepsChange(exlog) {
        console.log(exlog)
        let wdid = exlog.workoutDayId.toString()
        let repstring = exlog.repstring
        let entry = {}
        entry[wdid] = repstring
        this.logs = Object.assign(this.logs, entry)
        console.log(this.logs)
    }

    alreadySubmitted() {
        return false
    }

    componentDidMount() {
        let exercises = this.props.programInfo.weeks[1][1]
        this.logs = {}
        for (let i=0; i<exercises.length; i++) {
            let exercise = exercises[i]
            let l = []
            for (let s=0; s<exercise.sets; s++) {
                l.push(exercise.reps)
            }
            this.logs[exercise.id.toString()] = l.join(",")
        }
    }

    componentWillReceiveProps(nextprops) {
        console.log("lwf wcp", nextprops)
    }

    render() {
        let dateItems = []
        let weeks = this.props.programInfo.weeks
        let week, day
        for (week in weeks) {
            let days = weeks[week]
            for (day in days) {
                let k = 'w,' + week + ',d,' + day
                let text = 'Week ' + week + ' Day ' + day
                dateItems.push(
                    <MenuItem
                        value={k}
                        key={k}
                        primaryText={text}
                    />
                )
            }
        }

        let k = this.state.wd.split(",")
        week = k[1]
        day = k[3]
        let exercises = this.props.programInfo.weeks[week][day]
        // console.log(exercises)

        const eForms = exercises.map((ex, idx) => (
            <ERow
                key={idx}
                sets={ex.sets}
                reps={ex.reps}
                handleRepsChange={this.handleRepsChange}
                workoutDayId={ex.id}
            />
        ))

        return (

            <div>
                <h1> {this.props.programInfo.program.name} </h1>
                <DropDownMenu maxHeight={300} value={this.state.wd} onChange={this.handleWDSelect}>
                    {dateItems}
                </DropDownMenu>
                {eForms}
                <RaisedButton onClick={this.handleSubmit} disabled={this.alreadySubmitted()}> Submit </RaisedButton>
            </div>
        )
    }
}

export default LogWorkoutForm