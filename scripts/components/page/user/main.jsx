/**
 * Created by Procopiou Nick on 12/10/2015.
 */

React = require("react");

var navigationStore = require('stores/navigation');

var messageStore = require("stores/message");

var pages = {
    SignIn: require('components/user/signin.jsx'),
    Login: require('components/user/signin.jsx'),
    Join: require('components/user/join.jsx'),
    ResetPassword: require('components/user/resetpassword.jsx'),
    ResetPasswordConfirmation: require('components/user/resetpasswordconfirmation.jsx'),
    NewPassword: require('components/user/newpassword.jsx'),
    JoinConfirmation: require('components/user/joinconfirmation.jsx')
};

module.exports = React.createClass({

    displayName: 'Main',

    mixins: [
        Reflux.connect(navigationStore, 'navigation'),  // this.state.navigation
        Reflux.connect(messageStore, 'message') // this.state.message
    ],

    renderMainContent: function(){
        var pageConstructor = pages[this.state.navigation.active.name];

        if(!pageConstructor) {
            return false;
        }
        return(
          React.createElement(pageConstructor)
        )
    },

    message: function() {

        var className = this.state.message.notification ? "notification visible" : "notification";
        return (
            <div className={className}>
                {this.state.message.notification}
            </div>
        )
    },

    render: function () {

        if (!this.state.navigation.active){
            return false;
        }

        return (
           <main className={"page " + this.state.navigation.active.name.toLowerCase()}>
               <div>
                   {this.renderMainContent()}
               </div>
               {this.message()}
           </main>
        );
    }
});

