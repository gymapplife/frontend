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

          return (
            <Table onRowSelection={this.props.handleSelection}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn></TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
              <TableBody>
                {workouts.map((workout, idx) => (
                    <TableRow key={idx} selected={this.isSelected(idx)}>
                        <TableRowColumn></TableRowColumn>
                        <TableRowColumn> {workout.name} </TableRowColumn>
                        <TableRowColumn> {workout.description} </TableRowColumn>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          )
      }
}

export default SelectWorkoutTable