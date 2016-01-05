/**
 * Created by Procopiou Nick on 9/9/2015.
 */

React = require("react");
Reflux = require("reflux");

var navigationStore = require('stores/navigation');
var usersStore = require('stores/users');

var headerComponents = {
    Default: require('components/user/header/index.jsx'),
};

module.exports = React.createClass({

    mixins: [
        Reflux.connect(navigationStore, 'navigation'),  // this.state.navigation
        Reflux.connect(usersStore, 'users'),  // this.state.users
    ],


    displayName: 'Header',

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
           <header>

               <div className="inner">

                   <div className="logo">
                       Friday Footie
                   </div>

                   <div className="extra">
                       {this.renderHeaderComponent()}
                   </div>

               </div>

           </header>
        );
    }
});

