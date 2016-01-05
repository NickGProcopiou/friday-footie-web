var Reflux = require('reflux');

var resources = require('utils/resources');

var fixturesActions = require('actions/fixtures.js');

// Export the Reflux Store
module.exports = Reflux.createStore({

	namespace: 'fixtures',

	data: {
		rounds: [],
		currentRoundStartDate: undefined,
		currentRoundFixtures: []
	},

	seasonStart: new Date(2015,7,8), // Sat 8th August

	seasonFinish: new Date(2016,4,15), // Sun 15th May

	init: function() {

		this.listenTo(fixturesActions.loadFixtures.success, 'loadFixturesSuccess');

		this.listenTo(fixturesActions.setFixtures, 'setFixtures');

		this.listenTo(fixturesActions.changeSelectedRound, 'changeSelectedRound');

		// this.getFixtures();

		this.buildRounds();
	},

	setFixtures: function(fixtures){

		var round = this.findCurrentRound(this.data.currentRoundStartDate);

		this.data.rounds[round.index].fixtures = fixtures;
		this.data.currentRoundFixtures = fixtures;
		this.done();
	},

	changeSelectedRound: function(selectedRoundStartDate){

		var newSelectedRoundDate = parseInt(selectedRoundStartDate);
		this.data.currentRoundStartDate = newSelectedRoundDate;
		this.data.currentRoundFixtures = this.findCurrentRound(newSelectedRoundDate).round.fixtures;

		this.done();
	},

	createTenFixtures: function() {

		var fixtures = [];

		for (var i = 0; i < 10; i++){

			fixtures.push({home: undefined, away: undefined});
		}

		return fixtures;

	},

	newRound: function(startDate, endDate){

		var that = this;

		return {
			startDate: startDate,
			endDate: endDate,
			fixtures: that.createTenFixtures()
		}
	},

	findCurrentRound: function(startDate) {

		for (var i=0; i<this.data.rounds.length; i++){

			if (this.data.rounds[i].startDate === startDate){

				return {round: this.data.rounds[i], index: i};
			}
		}
	},

	buildRounds: function(){

		var that = this;
		var seasonStartDate = new Date(that.seasonStart);
		var seasonEndDate = new Date(that.seasonFinish);
		var roundStartDate = new Date(that.seasonStart);
		var today = new Date();

		that.data.rounds.push(that.newRound(roundStartDate.setDate(roundStartDate.getDate()), roundStartDate.setDate(roundStartDate.getDate() + 5)));

		while (roundStartDate < seasonEndDate) {

			var startDate = roundStartDate.setDate(roundStartDate.getDate() + 1);
			var endDate = roundStartDate.setDate(roundStartDate.getDate() + 6);
			that.data.rounds.push(that.newRound(startDate, endDate));

			if (startDate < today && endDate > today){
				that.data.currentRoundStartDate = startDate;
				that.data.currentRoundFixtures = that.findCurrentRound(startDate).round.fixtures;
			}
		}
	},

	getFixtures: function(){

		var curr = new Date;
		var fridayThisWeek = curr.getDate() - curr.getDay() + 5;
		var mondayThisWeek = fridayThisWeek + 3;

		var from_date = fridayThisWeek + "." + (curr.getMonth() + 1) + "." + curr.getFullYear();
		var to_date = 	mondayThisWeek + "." + (curr.getMonth() + 1) + "." + curr.getFullYear();

		fixturesActions.loadFixtures(from_date, to_date);

	},

	newTeam: function(name, shortname){

		var team = {};
		team.name = name;
		team.shortname = shortname;

		return team;

	},

	done: function() {
		this.trigger(this.data);
	},
	getInitialState: function() {
		return this.data;
	}
});