import React, { Component } from 'react'
import {Card, CardHeader } from 'material-ui/Card'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import NutritionLogTable from './NutritionLogTable'
import NutritionHistory from './NutritionHistory'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import request from 'superagent'
import * as constants from '../constants'

class Nutrition extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tab: "view",
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

            viewWD: "",
            allFoodLogs: {}
        }

        this.handleTabChange = this.handleTabChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleAddFood = this.handleAddFood.bind(this)
        this.handleRemoveFood = this.handleRemoveFood.bind(this)
        this.handleFoodNameChange = this.handleFoodNameChange.bind(this)
        this.handleFoodCaloriesChange = this.handleFoodCaloriesChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLocalAddDay = this.handleLocalAddDay.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleWDSelect = this.handleWDSelect.bind(this)
        this.loadFoods = this.loadFoods.bind(this)
        this.handleDeleteDay = this.handleDeleteDay.bind(this)
    }

    handleTabChange(tab) {
        this.setState({tab: tab})
    }

    handleDateChange(field, value) {
        switch (field) {
            case "day":
                this.setState({day: value})
                break
            case "week":
                this.setState({week:value})
                break
        }
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
        if (!this.state.week || isNaN(this.state.week)) verify = false
        if (!this.state.day || isNaN(this.state.day)) verify = false
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
                    week: this.state.week,
                    day: this.state.day,
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
                    week: this.state.week,
                    day: this.state.day,
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
                    week: this.state.week,
                    day: this.state.day,
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
                    week: this.state.week,
                    day: this.state.day,
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
            console.log(obj)
            let day = obj.day
            let week = obj.week
            let meal = obj.meal
            let newfoodlogs = Object.assign({}, this.state.allFoodLogs)
            
            if (newfoodlogs[week]) {
                if (newfoodlogs[week][day]) {
                    if (newfoodlogs[week][day][meal]) {
                        newfoodlogs[week][day][meal].push(obj)
                    } else {
                        newfoodlogs[week][day][meal] = [obj]
                    }
                } else {
                    let newday = {}
                    newday[meal] = [obj]
                    newfoodlogs[week][day] = newday
                }
            } else {
                let newday = {}
                newday[meal] = [obj]
                
                let newweek = {}
                newweek[day] = newday

                newfoodlogs[week] = newweek
            }
            this.setState({allFoodLogs: newfoodlogs})
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
            this.setState({allFoodLogs: obj})
        }
    }

    handleWDSelect(event, index, value) {
        this.setState({viewWD: value})
    }

    handleDeleteDay() {
        let week = this.state.viewWD.split(",")[1]
        let day = this.state.viewWD.split(",")[3]
        let currentFoodInfo = this.state.allFoodLogs[week][day]
        
        for (var meal in currentFoodInfo) {
            let foodlist = currentFoodInfo[meal]
            for (var i=0; i<foodlist.length; i++) {
                console.log("removing food entry with id", foodlist[i].id)
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
                let newfoodlogs = Object.assign({}, this.state.allFoodLogs)
                let weeklogs = newfoodlogs[week]
                delete weeklogs[day]
                
                // also remove the week if day is empty
                let counter=0
                for (var key in weeklogs) {
                    counter += 1
                }
                if (counter == 0) {
                    delete newfoodlogs[week]
                }

                this.setState({allFoodLogs: newfoodlogs, viewWD: ""})
            }
        }
    }

    render() {
        let dateItems = []
        for (var week in this.state.allFoodLogs) {
            for (var day in this.state.allFoodLogs[week]) {
                let foodEntry = this.state.allFoodLogs[week][day]
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

        let currentFoodInfo = null
        console.log("getting food info from allfoodlogs", this.state.allFoodLogs)
        if (this.state.viewWD != "") {
            let week = this.state.viewWD.split(",")[1]
            let day = this.state.viewWD.split(",")[3]
            currentFoodInfo = this.state.allFoodLogs[week][day]
        }

        return (
            <Tabs value={this.state.tab} onChange={this.handleTabChange}>
                <Tab label="View" value="view">
                    <Card>
                        <h1> View Nutrition History </h1>
                        <DropDownMenu maxHeight={300} value={this.state.viewWD} onChange={this.handleWDSelect}>
                            {dateItems}
                        </DropDownMenu>
                        <RaisedButton 
                            onClick={this.handleDeleteDay}
                            disabled={this.state.viewWD == ""}
                        > Delete Day </RaisedButton>
                        <NutritionHistory 
                            userInfo={this.props.userInfo}
                            foodInfo={currentFoodInfo}
                        />
                    </Card>
                </Tab>
                <Tab label="Log" value="log">
                    <Card>
                        <h1> Create Nutrition Log </h1>
                        <TextField 
                            hintText="Week" 
                            value={this.state.week} 
                            onChange={(event) => {this.handleDateChange("week", event.target.value)}}
                            errorText = {(!this.state.week || isNaN(this.state.week)) && this.state.showErr && "Invalid"}
                        />
                        <TextField 
                            hintText="Day"
                            value={this.state.day}
                            onChange={(event) => {this.handleDateChange("day", event.target.value)}}
                            errorText = {(!this.state.day || isNaN(this.state.day)) && this.state.showErr && "Invalid"}
                        />
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
                        />
                        <RaisedButton 
                            onClick={this.handleSubmit} 
                            disabled={this.state.numBreakfast == 0 &&
                                this.state.numLunch == 0 &&
                                this.state.numDinner == 0 &&
                                this.state.numSacks == 0}
                        > Submit </RaisedButton>
                        <RaisedButton onClick={this.handleReset}> Reset </RaisedButton>
                    </Card>
                </Tab>
            </Tabs>
        )
    }

}

export default Nutrition