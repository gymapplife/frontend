import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FacebookHeader from '../containers/FacebookHeader'
import Workout from '../containers/Workout'
import Nutrition from '../containers/Nutrition'
import Profile from '../containers/Profile'
import Analytics from '../containers/Analytics'
import Photos from '../containers/Photos'
import Navbar from '../containers/Navbar'
import { Redirect } from 'react-router-dom'
import './App.css'

class App extends React.Component {

    render() {
        let content

        if (!this.props.loggedIn) {
            content = <FacebookHeader />
        } else {
            if (!this.props.signedUp) {
                content = <Redirect to="/signup" />
            } else {
                switch(this.props.currentPage) {
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
                    default:
                        content = <Profile />
                }
            }
        }

        return (
            <div className="box">
                <AppBar title="GymApp.life" className="header" />
                <div className="content">
                    {content}
                </div>
                <Navbar />
            </div>
        )
    }
}

export default App
