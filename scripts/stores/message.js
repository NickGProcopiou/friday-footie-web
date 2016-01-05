var Reflux = require('reflux');

var messageActions = require('actions/message');

// Export the Reflux Store
module.exports = Reflux.createStore({
	namespace: 'message',

	data: {
		text: undefined,
		title: undefined,
		confirmCallback: undefined,
		cancelCallback: undefined,
		notification: undefined,
		OkButtonResource: undefined
	},

	init: function() {
		this.listenTo(messageActions.setMessage, 'setMessage');
		this.listenTo(messageActions.setNotification, 'setNotification');
	},

	setMessage: function(options) {

		if (options === undefined){
			options = {};
		}

		this.data.title = options.title;
		this.data.text = options.text;
		this.data.confirmCallback = options.confirm;
		this.data.cancelCallback = options.cancel;
		this.data.OkButtonResource = options.OkButtonResource
		this.done();
	},

	setNotification: function(msg, dur){

        var that = this;

		this.data.notification = msg;
		this.done();

		setTimeout(function(){
			that.data.notification = undefined;
            that.done()
		}, dur || 2500);
	},

	done: function() {
		this.trigger(this.data);
	},
	getInitialState: function() {
		return this.data;
	}
});