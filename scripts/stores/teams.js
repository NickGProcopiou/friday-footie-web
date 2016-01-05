var Reflux = require('reflux');

var resources = require('utils/resources');

// Export the Reflux Store
module.exports = Reflux.createStore({

	namespace: 'teams',

	data: [],

	init: function() {

		var that = this;
		this.data = [
			that.newTeam("Arsenal", 				"ARS"),
			that.newTeam("Aston Villa", 			"AVL"),
			that.newTeam("Bournemouth", 			"BOU"),
			that.newTeam("Chelsea", 				"CHE"),
			that.newTeam("Crystal Palace", 		"CRY"),
			that.newTeam("Everton", 				"EVE"),
			that.newTeam("Leicester", 			"LEI"),
			that.newTeam("Liverpool", 			"LIV"),
			that.newTeam("Manchester City", 		"MCI"),
			that.newTeam("Manchester United", 	"MUN"),
			that.newTeam("Newcastle", 			"NEW"),
			that.newTeam("Norwich", 				"NOR"),
			that.newTeam("Southampton", 			"SOU"),
			that.newTeam("Stoke", 					"STK"),
			that.newTeam("Sunderland", 				"SUN"),
			that.newTeam("Swansea", 					"SWA"),
			that.newTeam("Tottenham", 				"TOT"),
			that.newTeam("Watford", 					"WAT"),
			that.newTeam("West Brom", 				"WBA"),
			that.newTeam("West Ham", 				"WHU")
		];
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