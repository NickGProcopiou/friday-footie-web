var Reflux = require('reflux');
var api = require('api/fixtures.js');
var requestUtils = require('utils/request/index.js');

// Define the actions
var actions = Reflux.createActions({

    'loadFixtures': {
        children: [
            "success",
            "error"
        ]
    },

    'setFixtures': {},
    'changeSelectedRound': {},
    'setSelectedRoundToThisWeek': {}

});

actions.loadFixtures.listen(function(from_date, to_date) {
    api.loadFixtures(from_date, to_date)
        .done(requestUtils.done(actions.loadFixtures.success))
        .fail(requestUtils.fail(actions.loadFixtures.error));
});

module.exports = actions;