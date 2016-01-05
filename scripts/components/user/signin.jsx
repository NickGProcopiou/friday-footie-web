/**
 * Created by procopiou_nick on 12/10/2015.
 */

var React = require('react');
var Reflux = require('reflux');

var usersActions = require("actions/users");
var navigationActions = require("actions/navigation");

var resources = require("utils/resources");

var Tooltip = require("components/tooltip/index.jsx");

var pageUtils = require("utils/page");

var $ = require("jquery");

module.exports = React.createClass({

    displayName: 'Sign in',

    getInitialState: function(){

        return {
            email: "",
            password: ""
        }
    },

    componentDidMount: function(){

        $(".form").keydown(function(e){
            if(e.keyCode === 13){
                $(this).find("#submit").trigger("click");
            }
        });

        if (pageUtils.getQueryString("verify") === "1"){
            usersActions.verify(pageUtils.getQueryString("token"));
        }
    },


    updateFields: function(e){

        if (e && e.target){
            var state = {};
            state[e.target.id] = e.target.value;

            this.setState(state);
        }
    },


    signIn: function(){
        var user = {
            email: this.state.email.toLowerCase(),
            password: this.state.password
        }
        usersActions.signIn(user);
    },

    showForgottenPassword: function(){
        navigationActions.changePage("ResetPassword");
    },

    showJoin: function(){
        navigationActions.changePage("Join");
    },

    isValid: function(){
        return this.state.email !== "" &&
                this.state.password.length > 0;
    },

    render: function () {

        return (
            <div className="form">

                <ul>

                    <li className="active">{resources.SignIn}</li>
                    <li onClick={this.showJoin}>{resources.Join}</li>

                </ul>

                <div className="row">

                    <div className="frm">
                        <label htmlFor="email">
                            {resources.Email}
                            <Tooltip text="SignInEmailToolTip" />
                        </label>

                        <input type="text" id="email" onChange={this.updateFields} value={this.state.email} />
                    </div>

                </div>

                <div className="row">

                    <div className="frm">
                        <label htmlFor="password">
                            {resources.Password}
                            <Tooltip text="SignInPasswordToolTip" />
                        </label>

                        <input type="password" id="password" onChange={this.updateFields} value={this.state.password} />
                    </div>

                </div>

                <div className="row">

                    <div className="frm">

                        <button id="submit" disabled={!this.isValid()} onClick={this.signIn}>{resources.SignIn}</button>
                    </div>

                </div>

                <div className="row">

                    <div className="frm">

                        <a onClick={this.showForgottenPassword}>{resources.ForgottenPassword}</a>

                    </div>

                </div>


            </div>
        )
    }
});