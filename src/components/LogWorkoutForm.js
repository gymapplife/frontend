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
            values: initValues,
            exname: "loading"
        }

        this.handleCellSelect = this.handleCellSelect.bind(this)
        this.setExersiseName = this.setExersiseName.bind(this)
    }

    handleCellSelect(event, index, value, set) {
        let s = this.state.values.slice()
        s[set] = value
        let d = {
            workoutDayId: this.props.workoutDayId,
            repstring: s.join(",")
        }
        this.props.handleRepsChange(d)
        this.setState({values: s})
    }

    componentWillReceiveProps() {
        let initValues = []
        for (let i=0; i<this.props.sets; i++) {
            initValues.push(this.props.reps)
        }
        this.setState({values: initValues})
    }

    componentDidMount() {
        request
            .get(constants.GAL_BACKEND_EXERSISE_URL + this.props.exid + '/')
            .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
            .end(this.setExersiseName)
    }

    setExersiseName(err, resp) {
        if (err) {
            console.log(err)
        } else {
            let obj = JSON.parse(resp.text)
            this.setState({exname: obj.name})
        }
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

        let instructions
        if (this.props.weight == 0) {
            instructions = <h3> {this.state.exname} - {this.props.sets} x {this.props.reps} </h3>
        } else {
            instructions = <h3> {this.state.exname} - {this.props.sets} x {this.props.reps} {this.props.weight} lbs </h3>
        }

        return (
            <div><br />
                {instructions}
                <GridList cols={sets} className="log-row--height">
                    {eRow}
                </GridList>
            </div>
        )
    }
}

class LogWorkoutForm extends React.Component {
    constructor(props) {
        super(props)
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
        this.props.handleSubmitLog(this.logs, this.state.wd)
    }

    handleRepsChange(exlog) {
        let wdid = exlog.workoutDayId.toString()
        let repstring = exlog.repstring
        let entry = {}
        entry[wdid] = repstring
        this.logs = Object.assign(this.logs, entry)
    }

    alreadySubmitted() {
        return this.props.submittedDays.indexOf(this.state.wd) > -1
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

        const eForms = exercises.map((ex, idx) => (
            <ERow
                key={idx}
                sets={ex.sets}
                reps={ex.reps}
                weight={ex.weight}
                exid={ex.exercise}
                userInfo={this.props.userInfo}
                handleRepsChange={this.handleRepsChange}
                workoutDayId={ex.id}
            />
        ))

        let content
        if (this.props.submittedDays.indexOf(this.state.wd) > -1) {
            content = <h2> Submitted! </h2>
        } else {
            content = (
                <div>
                    {eForms}<br /><br />
                    <RaisedButton onClick={this.handleSubmit}> Submit </RaisedButton>
                </div>
            )
        }

        return (
            <div>
                <h1> {this.props.programInfo.program.name} </h1>

                <DropDownMenu maxHeight={300} value={this.state.wd} onChange={this.handleWDSelect}>
                    {dateItems}
                </DropDownMenu>
                {content}
            </div>
        )
    }
}

export default LogWorkoutForm
