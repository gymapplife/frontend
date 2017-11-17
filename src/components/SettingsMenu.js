import React, {Component} from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'

class SettingsMenu extends React.Component {
    render() {
        const settingsIcon = <FontIcon>⚙️</FontIcon>

        if (!this.props.loggedIn) {
            return null
        }

        return (
            <IconMenu iconButtonElement={settingsIcon}>
                <MenuItem onClick={() => this.props.handleNavigationClicked("editprofile")}> Edit Profile </MenuItem>
                <MenuItem onClick={this.props.handleLogout}> Logout </MenuItem>
            </IconMenu>
        )
    }
}

export default SettingsMenu
