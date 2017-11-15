import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import FontIcon from 'material-ui/FontIcon'

const workoutIcon = <FontIcon>💪</FontIcon>;
const nutritionIcon = <FontIcon>🍳</FontIcon>;
const profileIcon = <FontIcon>👤</FontIcon>;
const analyticsIcon = <FontIcon>📈</FontIcon>;
const photosIcon = <FontIcon>📸</FontIcon>;


class Navbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedIdx: 2
        }

        this.navigationClicked = this.navigationClicked.bind(this)
        this.select = this.select.bind(this)
    }

    logoutClicked() {
        this.props.handleLogout()
    }

    navigationClicked(page) {
        this.props.handleNavigationClicked(page)
    }

    select(idx) {
        this.setState({selectedIdx: idx})
    }

    render() {
        let content

        if (!this.props.loggedIn) {
            content = <div />
        } else {
            var selected
            switch(this.props.currentPage) {
                case "workout":
                    selected = 0
                    break
                case "nutrition":
                    selected = 1
                    break
                case "profile":
                    selected = 2
                    break
                case "analytics":
                    selected = 3
                    break
                case "analytics":
                    selected = 4
                    break
            }
            content = (
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={selected}>
                        <BottomNavigationItem label="Workout" icon={workoutIcon}
                            onClick={() => {this.select(0); this.navigationClicked("workout")}} />
                        <BottomNavigationItem label="Nutrition" icon={nutritionIcon}
                            onClick={() => {this.select(1); this.navigationClicked("nutrition")}} />
                        <BottomNavigationItem label="Profile" icon={profileIcon}
                            onClick={() => {this.select(2); this.navigationClicked("profile")}} />
                        <BottomNavigationItem label="Analytics" icon={analyticsIcon}
                            onClick={() => {this.select(3); this.navigationClicked("analytics")}} />
                        <BottomNavigationItem label="Photos" icon={photosIcon}
                            onClick={() => {this.select(4); this.navigationClicked("photos")}} />
                    </BottomNavigation>
                </Paper>
            )
        }

        return content
    }
}

export default Navbar
