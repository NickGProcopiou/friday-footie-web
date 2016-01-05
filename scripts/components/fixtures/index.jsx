/**
 * Created by Procopiou Nick on 9/9/2015.
 */

React = require("react");
Reflux = require("reflux");

var fixturesStore = require("stores/fixtures");
var fixturesActions = require("actions/fixtures");

var teamsStore = require("stores/teams");

var moment = require("moment");

module.exports = React.createClass({

    displayName: 'Fixtures',

    mixins: [
        Reflux.connect(fixturesStore, "fixtures"),
        Reflux.connect(teamsStore, "teams")
    ],

    allowDrop: function(ev) {
        ev.preventDefault();
    },

    drag: function(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    },

    drop: function(ev, HomeOrAway, index) {

        var that = this;

        ev.preventDefault();

        if (index !== undefined) {

            var fixtures = this.removeTeam(ev.dataTransfer.getData("text"));

            fixtures[parseInt(index)][HomeOrAway] = ev.dataTransfer.getData("text");

            fixturesActions.setFixtures(fixtures);
        }
    },

    removeTeam: function(team){

        var that = this;

        var fixtures = JSON.parse(JSON.stringify(that.state.fixtures.currentRoundFixtures));

        for (var i = 0; i<fixtures.length; i++){

            var fixture = fixtures[i];
            if (fixture.home !== undefined && fixture.home.toLowerCase() === team.toLowerCase()){
                fixtures[i].home = undefined;
            }
            if (fixture.away !== undefined && fixture.away.toLowerCase() === team.toLowerCase()){
                fixtures[i].away = undefined;
            }
        }

        fixturesActions.setFixtures(fixtures);

        return fixtures;

    },

    createTeam: function (name, index) {

        var that = this;
        return (
            <div id={name} key={"team" + index} draggable="true" onDragStart={that.drag} className="team">{name}</div>
        )
    },

    createFixture: function(fixture){

        var that = this;

        if (fixture === undefined){
            return false;
        }

        return (
            <span>
                {that.createTeam(fixture)}
                <span className="clear" onClick={function(){that.removeTeam(fixture)}}></span>
            </span>
        )
    },

    findUnmatchedTeams: function(){

        var that = this;

        return this.state.teams.filter(function(team){

            for (var i = 0; i<that.state.fixtures.currentRoundFixtures.length; i++){

                var fixture = that.state.fixtures.currentRoundFixtures[i];

                if ((fixture.home !== undefined && fixture.home.toLowerCase() === team.name.toLowerCase())
                    ||
                    (fixture.away !== undefined && fixture.away.toLowerCase() === team.name.toLowerCase())){
                    return false;
                }
            }

            return true;

        });
    },

    changeSelectedRound: function(e){

        if(e && e.target) {
            fixturesActions.changeSelectedRound(e.target.value);
        }
    },

    render: function () {

        var that = this;

        var fixtureOptions = this.state.fixtures.rounds.map(function(round){
            return <option value={round.startDate}>{moment(round.startDate).format("DD MMM YYYY") + " - " + moment(round.endDate).format("DD MMM YYYY")}</option>
        });

        if (this.state === undefined){
            return false;
        }

        var unmatchedTeams = this.findUnmatchedTeams();

        var teams = unmatchedTeams.map(function(team, index){
            return that.createTeam(team.name, index);
        });

        var currentRoundFixtures = this.state.fixtures.currentRound;

        if (currentRoundFixtures){
            return false;
        }

        var fixtures = this.state.fixtures.currentRoundFixtures.map(function(fixture, count){

            return (
                <div key={"fixture" + count} >

                    <div id={"hometeam" + count} className="team home" onDrop={function(e){that.drop(e, "home", count)}} onDragOver={that.allowDrop}>

                        <span>Home team {count}</span>
                        {that.createFixture(fixture.home)}
                    </div>

                    <div className="v">V</div>

                    <div id={"awayteam" + count} className="team away" onDrop={function(e){ that.drop(e, "away", count)}} onDragOver={that.allowDrop}>

                        <span>Away team {count}</span>
                        {that.createFixture(fixture.away)}
                    </div>

                </div>
            )
        });

        return (

            <div>

                <div id="fixtures">

                    <select onChange={this.changeSelectedRound} value={that.state.fixtures.currentRoundStartDate}>
                        {fixtureOptions}
                    </select>

                    {fixtures}
                </div>


                <div id="teams" onDrop={that.drop} onDragOver={this.allowDrop}>
                    {teams}
                </div>


            </div>
        );
    }
});

