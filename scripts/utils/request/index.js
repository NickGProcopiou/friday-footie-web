var messageActions = require('actions/message');

module.exports = {
	done: function (action) {

		return function (data, status, xhr) {
			// do special stuff for special status codes

			if (xhr.status === 205) {
				// something special?
			}

			action(data, status, xhr);
		}
	},
	fail: function(action) {
		return function(xhr, status, err) {

			action(xhr.status, status, err);
		}
	}
};


