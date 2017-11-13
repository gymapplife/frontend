import React, { Component } from 'react'
import request from 'superagent'
import * as constants from '../constants'

class NutritionHistory extends React.Component{
    constructor(props) {
        super(props)

    }

    render() {
        let breakfastTable = (<div> None </div>)
        if (this.props.foodInfo && this.props.foodInfo.BREAKFAST) {
            let breakfastRows = this.props.foodInfo.BREAKFAST.map((br, idx) => (
                <tr key={idx}>
                    <td>{br.name}</td>
                    <td>{br.calories}</td>
                </tr>
            ))

            breakfastTable = (
                <table><tbody>
                    {breakfastRows}
                </tbody></table>
            )
        }

        let lunchTable = (<div> None </div>)
        if (this.props.foodInfo && this.props.foodInfo.LUNCH) {
            let lunchRows = this.props.foodInfo.LUNCH.map((br, idx) => (
                <tr key={idx}>
                    <td>{br.name}</td>
                    <td>{br.calories}</td>
                </tr>
            ))

            lunchTable = (
                <table><tbody>
                    {lunchRows}
                </tbody></table>
            )
        }

        let dinnerTable = (<div> None </div>)
        if (this.props.foodInfo && this.props.foodInfo.DINNER) {
            let dinnerRows = this.props.foodInfo.DINNER.map((br, idx) => (
                <tr key={idx}>
                    <td>{br.name}</td>
                    <td>{br.calories}</td>
                </tr>
            ))

            dinnerTable = (
                <table><tbody>
                    {dinnerRows}
                </tbody></table>
            )
        }

        let snackTable = (<div> None </div>)
        if (this.props.foodInfo && this.props.foodInfo.SNACK) {
            let snackRows = this.props.foodInfo.SNACK.map((br, idx) => (
                <tr key={idx}>
                    <td>{br.name}</td>
                    <td>{br.calories}</td>
                </tr>
            ))

            snackTable = (
                <table><tbody>
                    {snackRows}
                </tbody></table>
            )
        }

        return (
            <div>
                <h2> Breakfast </h2>
                {breakfastTable}
                <h2> Lunch </h2>
                {lunchTable}
                <h2> Dinner </h2>
                {dinnerTable}
                <h2> Snacks </h2>
                {snackTable}
            </div>
        )
    }
}

export default NutritionHistory