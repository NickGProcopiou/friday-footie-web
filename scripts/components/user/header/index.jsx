/**
 * Created by Procopiou Nick on 9/9/2015.
 */

React = require("react");

var UserDropdown = require("components/user/header/userdropdown.jsx");
var navigationActions = require("actions/navigation");
var navigationStore = require("stores/navigation");

module.exports = React.createClass({

    mixins: [
        Reflux.connect(navigationStore, "navigation")
    ],

    render: function () {

        return (

            <div>
                Header
            </div>
        );
    }
});

