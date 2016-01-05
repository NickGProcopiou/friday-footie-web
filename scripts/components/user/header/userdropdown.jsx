/**
 * Created by procopiou_nick on 29/10/2015.
 */

React = require("react");

var usersStore = require("stores/users");
var navigationStore = require("stores/navigation");

var navigationActions = require("actions/navigation");
var usersActions = require("actions/users");

module.exports = React.createClass({

    getInitialState: function(){

        return {
            menuVisible: false
        }
    },

    mixins: [
        Reflux.connect(usersStore, "users"),
        Reflux.connect(navigationStore, "navigation")
    ],

    toggleMenuDisplay: function(e){

        var that = this;
        if (e.target.classList !== undefined && e.target.classList.contains("userdropdown")
            || e.target.classList.contains("displayname")) {
            that.setState({menuVisible: !that.state.menuVisible});
        }
    },

    goToProfile: function(){
        navigationActions.changePage("Profile");
    },

    goToFAQs: function(){
        navigationActions.changePage("FAQs");
    },

    goToProjects: function(){
        navigationActions.changePage("Projects");
    },

    signOut: function(){
        usersActions.signOut();
    },

    render: function () {

        var displayName = (this.state.users.loggedInUser.first_name !== ""
                            && this.state.users.loggedInUser.last_name !== "") &&

                            (this.state.users.loggedInUser.first_name !== undefined
                            && this.state.users.loggedInUser.last_name !== undefined)

            ?

            this.state.users.loggedInUser.first_name + " " + this.state.users.loggedInUser.last_name
            : (this.state.users.loggedInUser.email !== "" && this.state.users.loggedInUser.email !== undefined ?

                this.state.users.loggedInUser.email : "");

        return (

            <div>

                <a className={this.state.menuVisible ? "userdropdown active" : "userdropdown"} onClick={this.toggleMenuDisplay}>

                    <span className="displayname"><span className="notmobile">{displayName}</span></span>

                    <ul>
                        <li className="onlymobile name">{displayName}</li>
                        <li onClick={this.goToProfile}>My Profile</li>

                        <li className={this.state.navigation.active.name === "Projects" ? "active onlymobile" : "onlymobile"} onClick={this.goToProjects}>Hatch an idea</li>
                        <li className={this.state.navigation.active.name === "FAQs" ? "active onlymobile" : "onlymobile"} onClick={this.goToFAQs}>FAQs</li>

                        <li onClick={this.signOut}>Sign Out</li>
                    </ul>
                </a>

                <nav className="notmobile">
                    <ul>
                        <li className={this.state.navigation.active.name === "Projects" ? "active" : ""} onClick={this.goToProjects}>Hatch an idea</li>
                        <li className={this.state.navigation.active.name === "FAQs" ? "active" : ""} onClick={this.goToFAQs}>FAQs</li>
                    </ul>
                </nav>


            </div>



        )
    }
});

