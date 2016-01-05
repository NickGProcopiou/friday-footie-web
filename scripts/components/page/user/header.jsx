/**
 * Created by Procopiou Nick on 12/10/2015.
 */

React = require("react");
Reflux = require("reflux");

var navigationStore = require('stores/navigation');
var navigationActions = require('actions/navigation');

var headerComponents = {
    Default: require('components/user/header/index.jsx')
};

module.exports = React.createClass({

    mixins: [
        Reflux.connect(navigationStore, 'navigation')  // this.state.navigation
    ],

    displayName: 'Header',

    goHome: function(){

        navigationActions.changePage("SignIn");
    },

    renderHeaderComponent: function(){
        var pageConstructor = headerComponents[this.state.navigation.active.name];
        if(!pageConstructor) {
            return React.createElement(headerComponents['Default']);
        }
        return(
            React.createElement(pageConstructor)
        )
    },

    render: function () {

        if (!this.state.navigation.active){
            return false;
        }

        return (
            <header className={this.state.navigation.active.name === "SignIn" ? "home" : ""}>

               <div className="inner">
                   <div className="logo" onClick={this.goHome}></div>
                   <h1>{this.state.navigation.active.title}</h1>
               </div>
           </header>
        );
    }
});

