/**
 * Created by procopiou_nick on 12/10/2015.
 */

var React = require('react');
var Reflux = require('reflux');

var usersActions = require("actions/users");
var navigationActions = require("actions/navigation");

var Tooltip = require("components/tooltip/index.jsx");

var $ = require("jquery");

module.exports = React.createClass({

    displayName: 'Password',

    getInitialState: function(){

        return {
            email: ""
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

    passwordReminder: function(){
        usersActions.sendPasswordReminder(this.state.email);
    },

    showForgottenPassword: function(){
        navigationActions.changePage("Password");
    },

    showSignIn: function(){
        navigationActions.changePage("SignIn");
    },

    isValid: function(){
        return this.state.email !== "";
    },

    render: function () {

        return (
            <div className="form">

                <h2>Change Password</h2>

                <div className="row">

                    <div className="frm">

                        <label>Enter your BCG Digital Ventures email address to change your password</label>

                    </div>
                </div>

                <div className="row">

                    <div className="frm">
                        <label htmlFor="email">
                            BCGDV Email
                            <Tooltip text="SignInEmailToolTip" />
                        </label>

                        <input type="text" id="email" onChange={this.updateFields} value={this.state.email} />
                    </div>

                </div>

                <div className="row">

                    <div className="frm">

                        <button id="submit" disabled={!this.isValid()} onClick={this.passwordReminder}>Submit</button>
                    </div>

                </div>


            </div>
        )
    }
});