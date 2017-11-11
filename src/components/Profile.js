import React, { Component } from 'react'
import {Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.props.getProfileInfo(this.props.userInfo.id, this.props.userInfo.accessToken)
    }

    render() {
        return (
            <Card>
                <CardHeader title="Profile" />
                <img src={this.props.userInfo.pictureUrl} />
                <table><tbody><tr>
                    <td> {this.props.userInfo.age} Years </td>
                    <td> {this.props.userProfile.weight} lbs </td>
                    <td> {this.props.userProfile.height} cm </td>
                </tr></tbody></table>
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
