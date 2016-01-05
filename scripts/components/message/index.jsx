/**
 * Created by procopiou_nick on 23/09/2015.
 */

var React = require('react');
var Reflux = require('reflux');

var messageStore = require('stores/message');
var messageActions = require('actions/message');
var resources = require('utils/resources');

module.exports = React.createClass({

    displayName: 'MessageDialog',

    mixins: [
        Reflux.connect(messageStore, 'message')  // this.state.message
    ],

    confirm: function () {
        if (typeof (this.state.message.confirmCallback) === "function") {
            this.state.message.confirmCallback();
        }
        messageActions.setMessage();
    },

    cancel: function(){
        if (typeof (this.state.message.cancelCallback) === "function") {
            this.state.message.cancelCallback();
        }
        messageActions.setMessage();
    },

    renderTitle: function(){
        if (this.state.message.title === undefined) {
            return false;
        }
        return (
            <div className="title">
                {this.state.message.title}
            </div>
        )

    },

    renderCancel: function(){
        if (typeof (this.state.message.cancelCallback) !== "function") {
            return false;
        }
        return <button onClick={this.cancel}>{resources.Cancel}</button>;
    },

    render: function () {

        if (this.state.message.text === "" || this.state.message.text === undefined) {
            return false;
        }
        return (
            <div className="message">
                <div className="message__mask"></div>
                <div className="message__window">
                    {this.renderTitle()}
                    {this.state.message.text}
                    <div className="message__actions">
                        <button onClick={this.confirm}>{resources[this.state.message.OkButtonResource] || "Ok"}</button>
                        {this.renderCancel()}
                    </div>
                </div>
            </div>
        )

    }

});
