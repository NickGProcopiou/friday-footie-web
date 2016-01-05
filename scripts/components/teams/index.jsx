/**
 * Created by Procopiou Nick on 9/9/2015.
 */

React = require("react");
Reflux = require("reflux");
var teamsStore = require("stores/teams");
var Team = require("./team.jsx");

module.exports = React.createClass({

    displayName: 'Teams',

    mixins: [
      Reflux.connect(teamsStore, "teams")
    ],

    render: function () {

        var teams = this.state.teams.map(function(team){
            return (
                <Team {...team} />
            )
        });

        return (

            <ul className="teams">

                {teams}

            </ul>
        );
    }
});

