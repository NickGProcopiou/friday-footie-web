
React = require("react");
Reflux = require("reflux");

module.exports = React.createClass({

    displayName: 'Fixture',

    render: function(){

        return (

            <li>
                {this.props.match_localteam_name} Vs {this.props.match_visitorteam_name}
            </li>
        )
    }
});

