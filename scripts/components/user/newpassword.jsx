/**
 * Created by procopiou_nick on 12/10/2015.
 */

var React = require('react');
var Reflux = require('reflux');

var usersActions = require("actions/users");
var navigationActions = require("actions/navigation");
var messageActions = require("actions/message");

var usersUtils = require("utils/users");

var Tooltip = require("components/tooltip/index.jsx");

var pageUtils = require("utils/page");

var resources = require("utils/resources");

var $ = require("jquery");

module.exports = React.createClass({

    displayName: 'ResetPassword',

    getInitialState: function(){

        return {
            password: "",
            confirmPassword: ""
        }
    },

    componentDidMount: function(){

        $(".form").keydown(function(e){
            if(e.keyCode === 13){
                $(this).find("#submit").trigger("click");
            }
        });
    },


    updateFields: function(e){

        if (e && e.target){
            var state = {};
            state[e.target.id] = e.target.value;

            this.setState(state)
        }
    },

    resetPassword: function(){
        if (!usersUtils.isPasswordValid(this.state.password)) {
            return messageActions.setMessage({
                text:  resources.JoinPasswordNotValid
            });
        }
        usersActions.resetPassword(this.state.password, pageUtils.getQueryString("token"));
    },

    isValid: function(){
        return this.state.password.length > 0 &&
            (this.state.password === this.state.confirmPassword);
    },

    render: function () {

        return (
            <div className="form">

                <h2>New Password</h2>

                <div className="row">

                    <div className="frm">

                        <label>Please enter a new password. It must contain a capital letter, lowercase letter and a numeral</label>

                    </div>
                </div>

                <div className="row">

                    <div className="frm">
                        <label htmlFor="password">
                            Password
                            <Tooltip text="LorumIpsum" />
                        </label>

                        <input type="password" id="password" onChange={this.updateFields} value={this.state.password} />
                    </div>

                </div>

                <div className="row">

                    <div className="frm">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input type="password" id="confirmPassword" onChange={this.updateFields} value={this.state.confirmPassword} />
                    </div>

                </div>

                <div className="row">

                    <div className="frm">

                        <button id="submit" disabled={!this.isValid()} onClick={this.resetPassword}>Change Password</button>

                    </div>

                </div>


            </div>
        )
    }
});