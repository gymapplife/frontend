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
            <div className="content--center">
                <div className="profile-image">
                    <img src={this.props.userInfo.pictureUrl} />
                </div>
                <div className="profile-name">
                    <strong>
                        {this.props.userInfo.name}
                    </strong>
                </div>
                <div>
                    {this.props.userInfo.age} Years |&nbsp;
                    {this.props.userProfile.weight} lbs |&nbsp;
                    {this.props.userProfile.height} cm
                </div>

                <h3> Personal Records </h3>
                <table className="profile-personal-records"><tbody>
                    {prRows}
                </tbody></table>

                <br /><br />
                <RaisedButton onClick={() => this.props.handleLogout()}>
                    Logout
                </RaisedButton>
                <br /><br />
                <RaisedButton onClick={() => this.props.handleRemoveAccount(this.props.userInfo.id, this.props.userInfo.accessToken)}>
                    Leave
                </RaisedButton>
            </div>
        )
    }

}

export default Profile
