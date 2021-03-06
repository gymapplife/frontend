import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FacebookHeader from '../containers/FacebookHeader'
import Workout from '../containers/Workout'
import Nutrition from '../containers/Nutrition'
import Profile from '../containers/Profile'
import Analytics from '../containers/Analytics'
import Photos from '../containers/Photos'
import Navbar from '../containers/Navbar'
import SettingsMenu from '../containers/SettingsMenu'
import UpdateProfileForm from '../containers/UpdateProfileForm'
import GymStatus from './GymStatus'
import { Redirect } from 'react-router-dom'
import request from 'superagent'
import * as constants from '../constants'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.facebookExpire = this.facebookExpire.bind(this)
    }

    componentWillReceiveProps(props) {
        if (props.loggedIn) {
            request
                .get(constants.GAL_BACKEND_PROFILE_URL)
                .auth(props.userInfo.id, props.userInfo.accessToken)
                .end(this.facebookExpire)
        }
    }

    facebookExpire(err, resp) {
        if (err && err.status === 401) {
            this.props.handleLogout()
        }
    }

    render() {
        let content, appbar

        if (!this.props.loggedIn) {
            content = <FacebookHeader />
        } else {
            if (!this.props.signedUp) {
                content = <Redirect to="/signup" />
            } else {
                switch (this.props.currentPage) {
                    case "workout":
                        content = <Workout />
                        break;
                    case "nutrition":
                        content = <Nutrition />
                        break;
                    case "profile":
                        content = <Profile />
                        break;
                    case "analytics":
                        content = <Analytics />
                        break;
                    case "photos":
                        content = <Photos />
                        break;
                    case "editprofile":
                        content = <UpdateProfileForm />
                        break;
                    case "gymstatus":
                        content = <GymStatus />
                        break;
                    default:
                        content = <Profile />
                }

                appbar = (
                    <AppBar
                        title="GymApp.life"
                        className="header"
                        showMenuIconButton={false}
                        iconElementRight={<SettingsMenu />}
                    />
                )
            }
        }

        return (
            <div className="box">
                {appbar}
                <div className="content">
                    {content}
                </div>
                <Navbar />
            </div>
        )
    }
}

export default App
