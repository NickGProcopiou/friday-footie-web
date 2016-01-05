
React = require("react");
Reflux = require("reflux");

module.exports = React.createClass({

    displayName: 'Team',

    render: function(){

        return (

            <li>
                {this.props.name}
            </li>
        )
    }
});

