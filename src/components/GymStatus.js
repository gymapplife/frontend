import React, { Component } from 'react'
import request from 'superagent'
import * as constants from '../constants'

class GymStatus extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            pacClients: "",
            cifClients: "",
            pacLastUpdated: "",
            cifLastUpdated: ""
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
            console.log(obj)
            switch (obj.data.building_code) {
                case "PAC":
                    this.setState({pacClients: obj.data.clients})
                    this.setState({pacLastUpdated: obj.data.last_updated.substr(11,5)})
                    break;
                case "CIF":
                    this.setState({cifClients: obj.data.clients})
                    this.setState({cifLastUpdated: obj.data.last_updated.substr(11,5)})
                    break;
            }
        }
    }

    render() {
        return (
            <div className="content--center">
                <h1> Gyms Near You </h1>
                <table className="gyms-near-you">
                    <thead><tr>
                        <td><strong> Gym </strong></td>
                        <td><strong> # People </strong></td>
                        <td><strong> Last Updated (24h) </strong></td>
                    </tr></thead>
                    <tbody>
                        <tr>
                            <td> PAC </td>
                            <td> {this.state.pacClients} </td>
                            <td> {this.state.pacLastUpdated} </td>
                        </tr>
                        <tr>
                            <td> CIF </td>
                            <td> {this.state.cifClients} </td>
                            <td> {this.state.cifLastUpdated} </td>
                        </tr>
                    </tbody>
                </table>
                <br /><br />
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.4415817517856!2d-80.54614120000002!3d43.47225415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf6aa3624c67f%3A0xc784fe55aaa6522a!2sPhysical+Activities+Complex%2C+Waterloo%2C+ON!5e0!3m2!1sen!2sca!4v1511245760615" width="400" height="300" frameBorder="0" className="gmaps-iframe" allowFullScreen></iframe><br />
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5791.056741248761!2d-80.54520609999996!3d43.4704426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf6ab44151167%3A0x28279eba4a026006!2sCIF!5e0!3m2!1sen!2sca!4v1511245806407" width="400" height="300" frameBorder="0" className="gmaps-iframe" allowFullScreen></iframe>
            </div>
        )
    }
}

export default GymStatus
