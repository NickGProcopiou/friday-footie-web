/**
 * Created by Procopiou Nick on 9/9/2015.
 */

React = require("react");

var navigationStore = require('stores/navigation');

var messageStore = require("stores/message");

var pages = {
    Teams: require('components/teams/index.jsx'),
    Fixtures: require('components/fixtures/index.jsx'),
    FAQs: require('components/faqs/index.jsx')
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
               <div className="inner">
                   {this.renderMainContent()}
               </div>
               {this.message()}
           </main>
        );
    }
});

