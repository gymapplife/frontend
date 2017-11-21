import React, { Component } from 'react'
import {Card, CardHeader } from 'material-ui/Card'
import ReactHighcharts from 'react-highcharts'
import request from 'superagent'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import * as constants from '../constants'

class Analytics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exnames: {},
            exhistory: {},
            selectedEx: null,
            curInfo: {},
        }

        this.getPersonalRecords = this.getPersonalRecords.bind(this)
        this.getExerciseName = this.getExerciseName.bind(this)
        this.getExerciseHistory = this.getExerciseHistory.bind(this)
        this.handleSelectExercise = this.handleSelectExercise.bind(this)
    }

    componentDidMount() {
        request
            .get(constants.GAL_BACKEND_PR_URL)
            .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
            .end(this.getPersonalRecords)
    }

    getPersonalRecords(err, resp) {
        if (err) {
            console.log(err);
        } else {
            var obj = JSON.parse(resp.text)
            for (var exid in obj) {
                request
                    .get(constants.GAL_BACKEND_EXERSISE_URL + exid + '/')
                    .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
                    .end(this.getExerciseName)
                request
                    .get(constants.GAL_BACKEND_WORKOUT_LOGS_URL + exid + '/')
                    .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
                    .end((() => {var cexid = exid; return (err, resp) => this.getExerciseHistory(err, resp, cexid)})())
            }
        }
    }

    getExerciseName(err, resp) {
        if (err) {
            console.log(err);
        } else {
            var obj = JSON.parse(resp.text)
            var newName = {}
            newName[obj.id] = obj.name
            var newNames = Object.assign({}, this.state.exnames, newName)
            this.setState({exnames:newNames})
        }
    }

    getExerciseHistory(err, resp, exid) {
        if (err) {
            console.log(err);
        } else {
            var obj = JSON.parse(resp.text)
            var newHist = {}
            newHist[exid] = obj
            var newHists = Object.assign({}, this.state.exhistory, newHist)
            this.setState({exhistory: newHists})
        }
    }

    handleSelectExercise(event, idx, value) {
        this.setState({selectedEx: value})
        var newInfo = {
            exname: this.state.exnames[value],
            exhist: this.state.exhistory[value]
        }
        this.setState({curInfo: newInfo})
    }

    render() {
        
        // convert current info hist to date
        var config
        var graph
        if (this.state.curInfo.exhist) {
            var curHist = this.state.curInfo.exhist
            for (var i=0; i<curHist.length; i++) {
                var curPair = curHist[i]
                var curDateStr = curPair[0]
                if (typeof curDateStr === 'string' || curDateStr instanceof String) {
                    var curYMD = curDateStr.split(' ')[0].split('-')
                    var curDate = Date.UTC(curYMD[0], curYMD[1], curYMD[2])
                    curPair[0] = curDate
                }
            }

            config = {
                chart: {
                    type: 'spline'
                }, 
                title : {
                    text: this.state.curInfo.exname + ' History'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                        month: '%e. %b',
                        year: '%b'
                    },
                    title: {
                        text: 'Date'
                    }
                },
                series: [{
                    name: this.state.curInfo.exname,
                    data: curHist
                }]
            }
            graph = <ReactHighcharts config={config} />
        }


        const menuItems = []
        for (var k in this.state.exnames) {
            var exname = this.state.exnames[k]
            menuItems.push(
                <MenuItem value={k} key={k} primaryText={exname} />
            )
        }

        return (
            <Card>
                <CardHeader title="Analytics" />
                <DropDownMenu value={this.state.selectedEx} onChange={this.handleSelectExercise}>
                    {menuItems}
                </DropDownMenu>
                {graph}
            </Card>
        )
    }

}

export default Analytics