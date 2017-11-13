import React, { Component } from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class NutritionRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Toolbar>
            <ToolbarGroup firstChild={true}>
                <TextField value={this.props.foodName} onChange={this.props.handleNameChange} hintText="Food" 
                errorText={!this.props.foodName && this.props.showErr && "Required"}
                />
            </ToolbarGroup>
            <ToolbarGroup>
                <TextField value={this.props.foodCalories} onChange={this.props.handleCaloriesChange} hintText="Calories" 
                errorText = {(!this.props.foodCalories || isNaN(this.props.foodCalories)) && this.props.showErr && "Invalid"}
                />
            </ToolbarGroup>
            <ToolbarGroup>
                <RaisedButton onClick={() => this.props.handleRemoveRow(this.props.itemIdx)}> Remove </RaisedButton>
            </ToolbarGroup>
            </Toolbar>
        )  
    }
}

class NutritionLogTable extends React.Component {
    constructor(props) {
        super(props)

        this.handleAddRow = this.handleAddRow.bind(this)
        this.handleRemoveRow = this.handleRemoveRow.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleCaloriesChange = this.handleCaloriesChange.bind(this)
    }

    handleAddRow() {
        this.props.handleAddFood(this.props.tableName)
    }

    handleRemoveRow(itemidx) {
        this.props.handleRemoveFood(this.props.tableName, itemidx)
    }

    handleNameChange(itemidx, val) {
        this.props.handleNameChange(this.props.tableName, itemidx, val)
    }

    handleCaloriesChange(itemidx, val) {
        this.props.handleCaloriesChange(this.props.tableName, itemidx, val)
    }

    render() {
        const rows = this.props.foodlist.map((food, idx) => (
            <NutritionRow 
                key={idx} 
                itemIdx={idx} 
                foodName={this.props.foodlist[idx].name}
                foodCalories={this.props.foodlist[idx].calories}
                handleNameChange={(event) => {this.handleNameChange(idx, event.target.value)}}
                handleCaloriesChange={(event) => {this.handleCaloriesChange(idx, event.target.value)}}
                handleRemoveRow={this.handleRemoveRow}
                showErr={this.props.showErr}
            />
        ))
        return (
            <div>
                {rows}
                <RaisedButton onClick={this.handleAddRow}> Add Food </RaisedButton>
            </div>
        )
    }
}

export default NutritionLogTable