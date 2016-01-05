var Reflux = require('reflux');

var resources = require('utils/resources');

// Export the Reflux Store
module.exports = Reflux.createStore({

	namespace: 'users',

	data: {
        loggedInUser: {},
        directory:[]
	},

	init: function() {

	},

	done: function() {
		this.trigger(this.data);
	},
	getInitialState: function() {
		return this.data;
	}
});