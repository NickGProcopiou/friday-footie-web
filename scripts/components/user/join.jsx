/**
 * Created by procopiou_nick on 12/10/2015.
 */

var React = require('react');
var Reflux = require('reflux');

var usersActions = require("actions/users");
var navigationActions = require("actions/navigation");
var messageActions = require("actions/message");

var usersUtils = require("utils/users");

var resources = require("utils/resources");

var Tooltip = require("components/tooltip/index.jsx");

var $ = require("jquery");

module.exports = React.createClass({

    displayName: 'Join',

    getInitialState: function(){

        return {
            email: "",
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

    join: function(){
        var user = {
            email: this.state.email.toLowerCase(),
            password: this.state.password
        }

        if (!usersUtils.isEmailValid(this.state.email)) {
            return messageActions.setMessage({
                text:  resources.JoinEmailNotValid
            });
        }

        if (!usersUtils.isPasswordValid(this.state.password)) {
            return messageActions.setMessage({
                text:  resources.JoinPasswordNotValid
            });
        }

        usersActions.join(user);
    },

    showForgottenPassword: function(){
        navigationActions.changePage("Password");
    },

    showSignIn: function(){
        navigationActions.changePage("SignIn");
    },

    isValid: function(){
        return this.state.email !== "" &&
            this.state.password.length > 0 &&
            (this.state.password === this.state.confirmpassword);
    },

    render: function () {

        return (
            <div className="form">

                <ul>

                    <li onClick={this.showSignIn}>{resources.SignIn}</li>
                    <li className="active">{resources.Join}</li>

                </ul>

                <div className="row">

                    <div className="frm">
                        <label htmlFor="email">
                            {resources.Email}
                            <Tooltip text="JoinEmailTooltip" />
                        </label>

                        <input type="text" id="email" onChange={this.updateFields} value={this.state.email} />
                    </div>

                </div>

                <div className="row">

                    <div className="frm">
                        <label htmlFor="password">
                            {resources.Password}
                            <Tooltip text="JoinPasswordTooltip" />
                        </label>

                        <input type="password" id="password" onChange={this.updateFields} value={this.state.password} />
                    </div>

                </div>

                <div className="row">

                    <div className="frm">
                        <label htmlFor="confirmpassword">
                            {resources.ConfirmPassword}
                        </label>

                        <input type="password" id="confirmpassword" onChange={this.updateFields} value={this.state.confirmpassword} />
                    </div>

                </div>

                <div className="row">

                    <div className="frm">

                        <button id="submit" disabled={!this.isValid()} onClick={this.join}>{resources.Join}</button>
                    </div>

                </div>


            </div>
        )
    }
});