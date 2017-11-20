import React, { Component } from 'react'
import request from 'superagent'
import * as constants from '../constants'

class GymStatus extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            pacClients: "",
            cifClients: "",
        }

        this.fetchInfo = this.fetchInfo.bind(this)
    }

    componentDidMount() {
        var endpoint = constants.WPORTAL_WIRELESS_USAGE_URL + 'PAC.json'
        request
            .get(endpoint)
            .query('key=' + constants.WPORTAL_API_KEY)
            .end(this.fetchInfo)

        endpoint = constants.WPORTAL_WIRELESS_USAGE_URL + 'CIF.json'
        request
            .get(endpoint)
            .query('key=' + constants.WPORTAL_API_KEY)
            .end(this.fetchInfo)
    }

    fetchInfo(err, resp) {
        if (err) {
            console.log(err)
        } else {
            var obj = JSON.parse(resp.text)
            switch (obj.data.building_code) {
                case "PAC":
                    this.setState({pacClients: obj.data.clients})
                    break;
                case "CIF":
                    this.setState({cifClients: obj.data.clients})
                    break;
            }
        }
    }

    render() {
        return (
            <div>
                <h1> Gym Status </h1>
                <table>
                    <thead><tr>
                        <td> Building </td>
                        <td> Number of Clients </td>
                    </tr></thead>
                    <tbody>
                        <tr>
                            <td> PAC </td>
                            <td> {this.state.pacClients} </td>
                        </tr>
                        <tr>
                            <td> CIF </td>
                            <td> {this.state.cifClients} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default GymStatus