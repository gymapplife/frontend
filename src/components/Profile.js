import React, { Component } from 'react'
import {Card, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Card>
                <CardHeader title="Profile" />
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
