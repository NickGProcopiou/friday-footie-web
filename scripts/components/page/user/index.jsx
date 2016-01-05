/**
 * Created by Procopiou Nick on 12/10/2015.
 */

React = require("react");
Reflux = require("reflux");

// var Nav = require("./nav.jsx");
var Header = require("./header.jsx");
var Main = require("./main.jsx");
var Message = require("components/message/index.jsx");
var Footer = require("./footer.jsx");

var usersStore = require("stores/users");

var navigationActions = require("actions/navigation");

var pageUtils = require("utils/page/index.js");

module.exports = React.createClass({

    displayName: 'User Index',

    componentWillMount: function(){

        var page =  pageUtils.getQueryString("page") !== "" ? pageUtils.getQueryString("page") : "user";
        navigationActions.getPageLoadPathAndSetLandingPage(page);
    },

    mixins: [
        Reflux.connect(usersStore, 'users') // this.state.users
    ],

    render: function () {

        return (
            <div>
                <Main />
                <Header/>
                <Message />
                <Footer />
            </div>
        );
    }
});