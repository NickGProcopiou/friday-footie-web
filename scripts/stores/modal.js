var Reflux = require('reflux');

var modalActions = require('actions/modal');

// Export the Reflux Store
module.exports = Reflux.createStore({
    namespace: 'modal',

    data: {
        activeModal: false,
        dismissCallback: function () {},
        modalData: {},
        title: ''
    },

    init: function() {
        this.listenTo(modalActions.open, 'open');
        this.listenTo(modalActions.close, 'close');
    },

    open: function(opts) {
        this.data.activeModal = opts.type;
        this.data.modalData = opts.data;
        this.data.title = opts.title;
        this.data.dismissCallback = opts.cb;
        this.done();
    },

    close: function() {
        this.data = {
            activeModal: false,
            dismissCallback: function () {},
            modalData: {},
            title: ''
        };
        this.done();
    },

    done: function() {
        this.trigger(this.data);
    },
    getInitialState: function() {
        return this.data;
    }
});/**
 * Created by procopiou_nick on 29/09/2015.
 */
