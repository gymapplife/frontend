import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import FontIcon from 'material-ui/FontIcon'

const logoutIcon = <FontIcon className="material-icons">Logout</FontIcon>;
const workoutIcon = <FontIcon className="material-icons">Workout</FontIcon>;
const nutritionIcon = <FontIcon className="material-icons">Nutrition</FontIcon>;
const profileIcon = <FontIcon className="material-icons">Profile</FontIcon>;
const analyticsIcon = <FontIcon className="material-icons">Analytics</FontIcon>;
const photosIcon = <FontIcon className="material-icons">Photos</FontIcon>;


class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIdx: 2
        }

        this.logoutClicked = this.logoutClicked.bind(this)
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
            content = (
                <BottomNavigation selectedIndex={this.state.selectedIdx}>
                    <BottomNavigationItem icon={workoutIcon} onClick={() => {this.select(0); this.navigationClicked("workout")}}/>
                    <BottomNavigationItem icon={nutritionIcon} onClick={() => {this.select(1); this.navigationClicked("nutrition")}}/>
                    <BottomNavigationItem icon={profileIcon} onClick={() => {this.select(2); this.navigationClicked("profile")}}/>
                    <BottomNavigationItem icon={analyticsIcon} onClick={() => {this.select(3); this.navigationClicked("analytics")}}/>
                    <BottomNavigationItem icon={photosIcon} onClick={() => {this.select(4); this.navigationClicked("photos")}}/>
                    <BottomNavigationItem icon={logoutIcon} onClick={this.logoutClicked}/>
                </BottomNavigation>
            )
        }

        return (
            <Paper zDepth={1}>
            {content}
            </Paper>
        )
    }
}

export default Navbar