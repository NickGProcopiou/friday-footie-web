/**
 * Created by Procopiou Nick on 9/9/2015.
 */

React = require("react");
Reflux = require("reflux");

var navigationStore = require('stores/navigation');

module.exports = React.createClass({

    displayName: 'emptyheader',

    mixins: [
        Reflux.connect(navigationStore, 'navigation')  // this.state.navigation
    ],

    render: function () {

        return (

            <div>

                <h1 className="title">
                    {this.state.navigation.active.title}
                </h1>

            </div>

        );
    }
});