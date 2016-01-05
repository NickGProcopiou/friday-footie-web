/**
 * Created by Procopiou Nick on 9/9/2015.
 */

React = require("react");
Reflux = require("reflux");

// var Nav = require("./nav.jsx");
var Header = require("./header.jsx");
var Main = require("./main.jsx");
var Message = require("components/message/index.jsx");
var Modal = require("components/modal/index.jsx");
var Footer = require("./footer.jsx");

var modalStore = require("stores/modal");

var usersActions = require("actions/users");
var usersStore = require("stores/users");

var navigationActions = require("actions/navigation");
var navigationStore = require('stores/navigation');

var resources = require("utils/resources");

module.exports = React.createClass({

    displayName: 'Submit Home Index',

    mixins: [
        Reflux.connect(modalStore, 'modal'), // this.state.modal
        Reflux.connect(usersStore, 'users'),  // this.state.users
        Reflux.connect(navigationStore, 'navigation'),  // this.state.navigation
    ],

    componentWillMount: function(){

        // set default Page

        navigationActions.getPageLoadPathAndSetLandingPage("submit");
    },

    componentDidMount: function(){

        usersActions.getUserProfile();
        usersActions.getUserDirectory();
    },

    render: function () {

        var pageName = "";

        if (this.state.navigation.active && this.state.navigation.active.name){
            pageName = this.state.navigation.active.name.toLowerCase();
        }

        return (
            <div className={pageName}>
                <Main />
                <Header/>
                <Message />
                <Modal title={this.state.modal.title}
                       activeModal={this.state.modal.activeModal}
                       modalData={this.state.modal.modalData}
                       dismissCallback={this.state.modal.dismissCallback} />
                <Footer />
            </div>
        );
    }
});