import React, { Component } from 'react'
import {Card, CardHeader } from 'material-ui/Card'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import NutritionLogTable from './NutritionLogTable'
import NutritionHistory from './NutritionHistory'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import request from 'superagent'
import * as constants from '../constants'

class Nutrition extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tab: "view",
            dateobj: new Date(),
            currentFoodInfo: null,
            showErr: false,

            numBreakfast: 0,
            breakfastFields: [],

            numLunch: 0,
            lunchFields: [],

            numDinner: 0,
            dinnerFields: [],

            numSacks: 0,
            snackFields: [],

            allFoodLogs: {}
        }

        this.handleTabChange = this.handleTabChange.bind(this)
        this.handleAddFood = this.handleAddFood.bind(this)
        this.handleRemoveFood = this.handleRemoveFood.bind(this)
        this.handleFoodNameChange = this.handleFoodNameChange.bind(this)
        this.handleFoodCaloriesChange = this.handleFoodCaloriesChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLocalAddDay = this.handleLocalAddDay.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleDateSelect = this.handleDateSelect.bind(this)
        this.loadFoods = this.loadFoods.bind(this)
        this.handleDeleteDay = this.handleDeleteDay.bind(this)
    }

    handleTabChange(tab) {
        this.setState({tab: tab})
    }

    handleAddFood(table) {
        var newlist
        var num
        switch (table) {
            case "breakfast":
                newlist = this.state.breakfastFields.slice()
                newlist.push({
                    name: "",
                    calories: 0
                })
                num = this.state.numBreakfast
                this.setState({numBreakfast: num+1, breakfastFields: newlist})
                break
            case "lunch":
                newlist = this.state.lunchFields.slice()
                newlist.push({
                    name: "",
                    calories: 0
                })
                num = this.state.numLunch
                this.setState({numLunch: num+1, lunchFields: newlist})
                break
            case "dinner":
                newlist = this.state.dinnerFields.slice()
                newlist.push({
                    name: "",
                    calories: 0
                })
                num = this.state.numDinner
                this.setState({numDinner: num+1, dinnerFields: newlist})
                break
            case "snack":
                newlist = this.state.snackFields.slice()
                newlist.push({
                    name: "",
                    calories: 0
                })
                num = this.state.numSnack
                this.setState({numSnack: num+1, snackFields: newlist})
                break
        }
    }

    handleRemoveFood(table, idx) {
        var newlist
        var num
        switch(table) {
            case "breakfast":
                newlist = this.state.breakfastFields.slice()
                newlist.splice(idx, 1)
                num = this.state.numBreakfast
                this.setState({numBreakfast: num-1, breakfastFields: newlist})
                break
            case "lunch":
                newlist = this.state.lunchFields.slice()
                newlist.splice(idx, 1)
                num = this.state.numLunch
                this.setState({numLunch: num-1, lunchFields: newlist})
                break
            case "dinner":
                newlist = this.state.dinnerFields.slice()
                newlist.splice(idx, 1)
                num = this.state.numDinner
                this.setState({numDinner: num-1, dinnerFields: newlist})
                break
            case "snack":
                newlist = this.state.snackFields.slice()
                newlist.splice(idx, 1)
                num = this.state.numSnack
                this.setState({numSnack: num-1, snackFields: newlist})
                break
        }
    }

    handleFoodNameChange(table, idx, newname) {
        var newlist
        switch(table) {
            case "breakfast":
                newlist = this.state.breakfastFields.slice()
                newlist[idx].name = newname
                this.setState({breakfastFields: newlist})
                break
            case "lunch":
                newlist = this.state.lunchFields.slice()
                newlist[idx].name = newname
                this.setState({lunchFields: newlist})
                break
            case "dinner":
                newlist = this.state.dinnerFields.slice()
                newlist[idx].name = newname
                this.setState({dinnerFields: newlist})
                break
            case "snack":
                newlist = this.state.snackFields.slice()
                newlist[idx].name = newname
                this.setState({snackFields: newlist})
                break
        }
    }

    handleFoodCaloriesChange(table, idx, newcals) {
        var newlist
        switch(table) {
            case "breakfast":
                newlist = this.state.breakfastFields.slice()
                newlist[idx].calories = newcals
                this.setState({breakfastFields: newlist})
                break
            case "lunch":
                newlist = this.state.lunchFields.slice()
                newlist[idx].calories = newcals
                this.setState({lunchFields: newlist})
                break
            case "dinner":
                newlist = this.state.dinnerFields.slice()
                newlist[idx].calories = newcals
                this.setState({dinnerFields: newlist})
                break
            case "snack":
                newlist = this.state.snackFields.slice()
                newlist[idx].calories = newcals
                this.setState({snackFields: newlist})
                break
        }
    }

    handleSubmit() {
        let verify = true
        var entry
        for (var i=0; i<this.state.breakfastFields.length; i++) {
            entry = this.state.breakfastFields[i]
            if (!entry.name) verify = false
            if (!entry.calories) verify = false
            if (isNaN(entry.calories)) verify = false
        }
        for (var i=0; i<this.state.lunchFields.length; i++) {
            entry = this.state.lunchFields[i]
            if (!entry.name) verify = false
            if (!entry.calories) verify = false
            if (isNaN(entry.calories)) verify = false
        }
        for (var i=0; i<this.state.dinnerFields.length; i++) {
            entry = this.state.dinnerFields[i]
            if (!entry.name) verify = false
            if (!entry.calories) verify = false
            if (isNaN(entry.calories)) verify = false
        }
        for (var i=0; i<this.state.snackFields.length; i++) {
            entry = this.state.snackFields[i]
            if (!entry.name) verify = false
            if (!entry.calories) verify = false
            if (isNaN(entry.calories)) verify = false
        }

        if (!verify) {
            this.setState({showErr: true})
        } else {
            var entry
            for (var i=0; i<this.state.breakfastFields.length; i++) {
                entry = this.state.breakfastFields[i]

                let body = {
                    name: entry.name,
                    calories: entry.calories,
                    meal: "BREAKFAST"
                }

                request
                    .post(constants.GAL_BACKEND_FOOD_URL)
                    .type('form')
                    .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
                    .send(body)
                    .end(this.handleLocalAddDay)
            }

            for (var i=0; i<this.state.lunchFields.length; i++) {
                entry = this.state.lunchFields[i]

                let body = {
                    name: entry.name,
                    calories: entry.calories,
                    meal: "LUNCH"
                }

                request
                .post(constants.GAL_BACKEND_FOOD_URL)
                .type('form')
                .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
                .send(body)
                .end(this.handleLocalAddDay)
            }

            for (var i=0; i<this.state.dinnerFields.length; i++) {
                entry = this.state.dinnerFields[i]

                let body = {
                    name: entry.name,
                    calories: entry.calories,
                    meal: "DINNER"
                }

                request
                .post(constants.GAL_BACKEND_FOOD_URL)
                .type('form')
                .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
                .send(body)
                .end(this.handleLocalAddDay)
            }

            for (var i=0; i<this.state.snackFields.length; i++) {
                entry = this.state.snackFields[i]

                let body = {
                    name: entry.name,
                    calories: entry.calories,
                    meal: "SNACK"
                }

                request
                .post(constants.GAL_BACKEND_FOOD_URL)
                .type('form')
                .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
                .send(body)
                .end(this.handleLocalAddDay)
            }

            this.handleReset()
            this.setState({tab: "view"})
        }
    }

    handleLocalAddDay(err, resp) {
        if(err) {
            console.log(err)
        } else {
            let obj = JSON.parse(resp.text)

            let datekey = obj.created.substr(0, 10)
            let meal = obj.meal
            let newfoodlogs = Object.assign({}, this.state.allFoodLogs)

            if (newfoodlogs[datekey]) {
                newfoodlogs[datekey][meal].push(obj)
            } else {
                let newday = {
                    "BREAKFAST": [],
                    "LUNCH": [],
                    "DINNER": [],
                    "DESSERT": []
                }
                newday[meal].push(obj)
                newfoodlogs[datekey] = newday
            }

            this.setState({allFoodLogs: newfoodlogs})
            this.setState({dateobj: new Date()})
        }
    }

    handleReset() {
        this.setState({
            day: "",
            week: "",
            showErr: false,

            numBreakfast: 0,
            breakfastFields: [],

            numLunch: 0,
            lunchFields: [],

            numDinner: 0,
            dinnerFields: [],

            numSacks: 0,
            snackFields: [],
        })
    }

    componentDidMount() {
        request
            .get(constants.GAL_BACKEND_FOOD_URL)
            .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
            .end(this.loadFoods)
    }

    loadFoods(err, resp) {
        if (err) {
            console.log(err)
        } else {
            let obj = JSON.parse(resp.text)
            let today = new Date()
            let datekey = today.toISOString().substr(0, 10)
            let cfi = obj[datekey]
            this.setState({
                allFoodLogs: obj, 
                dateobj: today,
                currentFoodInfo: cfi,
            })
        }
    }

    handleDateSelect(event, date) {
        let datekey = date.toISOString().substr(0, 10)
        this.setState({dateobj: date, currentFoodInfo: this.state.allFoodLogs[datekey]})
    }

    handleDeleteDay() {
        for (var meal in this.state.currentFoodInfo) {
            let foodlist = this.state.currentFoodInfo[meal]
            for (var i=0; i<foodlist.length; i++) {
                request
                    .delete(constants.GAL_BACKEND_FOOD_URL + foodlist[i].id + '/')
                    .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
                    .end(function(err, resp) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(resp.text)
                        }
                    })

                // update state
                var datekey = this.state.dateobj.toISOString().substring(0, 10)
                let newfoodlogs = Object.assign({}, this.state.allFoodLogs)
                delete newfoodlogs[datekey]
                this.setState({allFoodLogs: newfoodlogs, currentFoodInfo: null})
            }
        }
    }

    render() {
        return (
            <Tabs value={this.state.tab} onChange={this.handleTabChange}>
                <Tab label="View Log" value="view">
                    <div className="content--center">
                        <DatePicker
                            hintText="Date"
                            value={this.state.dateobj}
                            onChange={this.handleDateSelect}
                        />
                        <NutritionHistory
                            userInfo={this.props.userInfo}
                            foodInfo={this.state.currentFoodInfo}
                        /><br />
                        <RaisedButton
                            onClick={this.handleDeleteDay}
                            disabled={this.state.dateobj === null}
                        > Delete Day </RaisedButton>
                    </div>
                </Tab>
                <Tab label="Record" value="log">
                    <div className="content--center">
                        <h2> Breakfast </h2>
                        <NutritionLogTable
                            foodlist={this.state.breakfastFields}
                            tableName="breakfast"
                            handleAddFood={this.handleAddFood}
                            handleRemoveFood={this.handleRemoveFood}
                            handleNameChange={this.handleFoodNameChange}
                            handleCaloriesChange={this.handleFoodCaloriesChange}
                            showErr={this.state.showErr}
                        />
                        <h2> Lunch </h2>
                        <NutritionLogTable
                            foodlist={this.state.lunchFields}
                            tableName="lunch"
                            handleAddFood={this.handleAddFood}
                            handleRemoveFood={this.handleRemoveFood}
                            handleNameChange={this.handleFoodNameChange}
                            handleCaloriesChange={this.handleFoodCaloriesChange}
                            showErr={this.state.showErr}
                        />
                        <h2> Dinner </h2>
                        <NutritionLogTable
                            foodlist={this.state.dinnerFields}
                            tableName="dinner"
                            handleAddFood={this.handleAddFood}
                            handleRemoveFood={this.handleRemoveFood}
                            handleNameChange={this.handleFoodNameChange}
                            handleCaloriesChange={this.handleFoodCaloriesChange}
                            showErr={this.state.showErr}
                        />
                        <h2> Snacks </h2>
                        <NutritionLogTable
                            foodlist={this.state.snackFields}
                            tableName="snack"
                            handleAddFood={this.handleAddFood}
                            handleRemoveFood={this.handleRemoveFood}
                            handleNameChange={this.handleFoodNameChange}
                            handleCaloriesChange={this.handleFoodCaloriesChange}
                            showErr={this.state.showErr}
                        /><br />
                        <RaisedButton
                            onClick={this.handleSubmit}
                            disabled={this.state.numBreakfast == 0 &&
                                this.state.numLunch == 0 &&
                                this.state.numDinner == 0 &&
                                this.state.numSacks == 0}
                        > Submit </RaisedButton>
                    </div>
                </Tab>
            </Tabs>
        )
    }
}

export default Nutrition
