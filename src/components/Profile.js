import React, { Component } from 'react'
import {Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import request from 'superagent'
import * as constants from '../constants'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            personalRecords: []
        }

        this.props.getProfileInfo(this.props.userInfo.id, this.props.userInfo.accessToken)

        this.getPersonalRecords = this.getPersonalRecords.bind(this)
        this.loadPersonalRecords = this.loadPersonalRecords.bind(this)
    }

    componentDidMount() {
        request
            .get(constants.GAL_BACKEND_PR_URL)
            .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
            .end(this.getPersonalRecords)
    }

    getPersonalRecords(err, resp) {
        if (err) {
            console.log(err)
        } else {
            let pr_obj = JSON.parse(resp.text)

            for (var exid in pr_obj) {
                if (pr_obj[exid] > 0) {
                    request
                        .get(constants.GAL_BACKEND_EXERSISE_URL + exid + '/')
                        .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
                        .end((() => {var creps = pr_obj[exid]; return (err, resp) => this.loadPersonalRecords(err, resp, creps)})())
                } 
            }
        }
    }

    loadPersonalRecords(err, resp, reps) {
        if (err) {
            console.log(err)
        } else {
            let exname = JSON.parse(resp.text).name
            let newPR = this.state.personalRecords.slice()
            newPR.push({exname: exname, reps:reps})
            this.setState({personalRecords: newPR})
        }
    }

    render() {
        const prRows = this.state.personalRecords.map((pr, idx) => (
            <tr key={idx}>
                <td> {pr.exname} </td>
                <td> {pr.reps} </td>
            </tr>
        ))

        return (
            <Card>
                <CardHeader title="Profile" />
                <img src={this.props.userInfo.pictureUrl} />
                <table><tbody><tr>
                    <td> {this.props.userInfo.age} Years </td>
                    <td> {this.props.userProfile.weight} lbs </td>
                    <td> {this.props.userProfile.height} cm </td>
                </tr></tbody></table>

                <h3> Personal Records </h3>
                <table><tbody>
                    {prRows}
                </tbody></table>
                
                <RaisedButton onClick={() => this.props.handleRemoveAccount(this.props.userInfo.id, this.props.userInfo.accessToken)}>
                    Remove Account
                </RaisedButton>
                <RaisedButton onClick={() => this.props.handleLogout()}>
                    Logout
                </RaisedButton>
            </Card>
        )
    }

}

export default Profile
