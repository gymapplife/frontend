import React, { Component } from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'

class SelectWorkoutTable extends React.Component {
    constructor(props) {
        super(props)

        this.isSelected = this.isSelected.bind(this)
    }

    isSelected(index) {
        return this.props.selected.indexOf(index) !== -1;
    }

    render() {
        const workouts = this.props.workouts
        let customRow
        if (this.props.isCustom) {
            customRow = (
                <TableRow selected={this.isSelected(workouts.length)}>
                    <TableRowColumn>Create Custom Workout</TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                </TableRow>
            )
        }

          return (
            <Table onRowSelection={this.props.handleSelection} className="workout-table">
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
              </TableRow>
            </TableHeader>
              <TableBody>
                {workouts.map((workout, idx) => (
                    <TableRow key={idx} selected={this.isSelected(idx)}>
                        <TableRowColumn> {workout.name} </TableRowColumn>
                        <TableRowColumn> {workout.description} </TableRowColumn>
                    </TableRow>
                ))}
                {customRow}
              </TableBody>
            </Table>
          )
    }
}

export default SelectWorkoutTable
