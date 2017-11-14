import React, { Component } from 'react'
import request from 'superagent'
import * as constants from '../constants'

class NutritionHistory extends React.Component{
    constructor(props) {
        super(props)

    }

    render() {
        let breakfastTable = (<div> No log </div>)
        if (this.props.foodInfo && this.props.foodInfo.BREAKFAST) {
            let breakfastRows = this.props.foodInfo.BREAKFAST.map((br, idx) => (
                <tr key={idx}>
                    <td className="nutrition-log-name">{br.name}</td>
                    <td className="nutrition-log-calories">{br.calories}</td>
                </tr>
            ))

            breakfastTable = (
                <table className="nutrition-log">
                    <tbody>
                        <tr>
                            <td className="nutrition-log-name"><strong>Food Item</strong></td>
                            <td className="nutrition-log-calories"><strong>Calories</strong></td>
                        </tr>
                        {breakfastRows}
                    </tbody>
                </table>
            )
        }

        let lunchTable = (<div> No log </div>)
        if (this.props.foodInfo && this.props.foodInfo.LUNCH) {
            let lunchRows = this.props.foodInfo.LUNCH.map((br, idx) => (
                <tr key={idx}>
                    <td className="nutrition-log-name">{br.name}</td>
                    <td className="nutrition-log-calories">{br.calories}</td>
                </tr>
            ))

            lunchTable = (
                <table className="nutrition-log">
                    <tbody>
                        <tr>
                            <td className="nutrition-log-name"><strong>Food Item</strong></td>
                            <td className="nutrition-log-calories"><strong>Calories</strong></td>
                        </tr>
                        {lunchRows}
                    </tbody>
                </table>
            )
        }

        let dinnerTable = (<div> No log </div>)
        if (this.props.foodInfo && this.props.foodInfo.DINNER) {
            let dinnerRows = this.props.foodInfo.DINNER.map((br, idx) => (
                <tr key={idx}>
                    <td className="nutrition-log-name">{br.name}</td>
                    <td className="nutrition-log-calories">{br.calories}</td>
                </tr>
            ))

            dinnerTable = (
                <table className="nutrition-log">
                    <tbody>
                        <tr>
                            <td className="nutrition-log-name"><strong>Food Item</strong></td>
                            <td className="nutrition-log-calories"><strong>Calories</strong></td>
                        </tr>
                        {dinnerRows}
                    </tbody>
                </table>
            )
        }

        let snackTable = (<div> No log </div>)
        if (this.props.foodInfo && this.props.foodInfo.SNACK) {
            let snackRows = this.props.foodInfo.SNACK.map((br, idx) => (
                <tr key={idx}>
                    <td className="nutrition-log-name">{br.name}</td>
                    <td className="nutrition-log-calories">{br.calories}</td>
                </tr>
            ))

            snackTable = (
                <table className="nutrition-log">
                    <tbody>
                        <tr>
                            <td className="nutrition-log-name"><strong>Food Item</strong></td>
                            <td className="nutrition-log-calories"><strong>Calories</strong></td>
                        </tr>
                        {snackRows}
                    </tbody>
                </table>
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
