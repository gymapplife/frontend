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
import { Redirect } from 'react-router-dom'
import './App.css'

class App extends React.Component {

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
                    default:
                        content = <Profile />
                }

                if (this.props.currentPage == "profile" || this.props.currentPage == "editprofile") {
                    appbar = (
                        <AppBar
                            title="GymApp.life"
                            className="header"
                            iconElementRight={<SettingsMenu />}
                        />
                    )
                } else {
                    appbar = (
                        <AppBar
                            title="GymApp.life"
                            className="header"
                        />
                    )
                }
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
