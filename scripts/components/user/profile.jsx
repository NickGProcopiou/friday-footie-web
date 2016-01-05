/**
 * Created by procopiou_nick on 29/09/2015.
 */

var React = require('react');
var Reflux = require('reflux');

var usersActions = require("actions/users");
var messageActions = require("actions/message");
var navigationActions = require("actions/navigation");

var Tooltip = require("components/tooltip/index.jsx");

var usersStore = require("stores/users");

var resources = require('utils/resources');
var usersUtils = require('utils/users');

var $ = require("jquery");

module.exports = React.createClass({

    mixins: [
        Reflux.connect(usersStore, 'users')
    ],

    getInitialState: function(){
       return {
            modifiedUser: {},
            originalUser: {}
        }
    },

    componentDidMount: function(){

        this.setInitialUserProps(this.state.users.loggedInUser);

        $(document).keydown(function(e){
            if(e.keyCode === 13){
                $(".form").find("#submit").trigger("click");
            }
        });
    },

    setInitialUserProps: function(user){

        if (user){

            var that = this;
            var userState = {};
            var update = false;

            if (JSON.stringify(that.state.originalUser) === "{}"){
                userState.originalUser = JSON.parse(JSON.stringify(user));
                update = true;
            }
            if (JSON.stringify(that.state.modifiedUser) === "{}"){
                userState.modifiedUser = JSON.parse(JSON.stringify(user));
                update = true;
            }

            if (update) {
                this.setState(userState);
            }

        }

    },

    setUser: function(user){

        var that = this;

        this.setState({
                modifiedUser: {
                    id:             that.state.users.loggedInUser.id,
                    email:          user.email,
                    first_name:     user.first_name,
                    last_name:      user.last_name,
                    job_title:      user.job_title,
                    office:         user.office,
                    experience:     user.experience,
                    passions:       user.passions
                }
            });
    },

    displayName: 'Profile',

    isDirty: function(){

        var modifiedUser = this.state.modifiedUser;
        var originalUser = this.state.originalUser;

        return JSON.stringify(modifiedUser) !== JSON.stringify(originalUser);
    },

    isInvalid: function(){

        if (!this.state){
            return false;
        }

        var modifiedUser = this.state.modifiedUser;
        return usersUtils.isUserProfileIncomplete(modifiedUser);
    },

    updateUser: function(e){

        if (e && e.target){
            var user = this.state.modifiedUser;
            user[e.target.id] = e.target.value;
            this.setState({modifiedUser: user});
        }

    },

    saveUser: function(){

        var modifiedUser = {
            id:             this.state.users.loggedInUser.id,
            email:          this.state.modifiedUser.email        || "",
            first_name:     this.state.modifiedUser.first_name   || "",
            last_name:      this.state.modifiedUser.last_name    || "",
            job_title:      this.state.modifiedUser.job_title    || "",
            office:         this.state.modifiedUser.office       || "",
            passions:       this.state.modifiedUser.passions     || "",
            experience:     this.state.modifiedUser.experience   || ""
        }

        usersActions.saveUserProfile(modifiedUser);

        this.setState({originalUser: modifiedUser}); // for reset

        // save to db

        if (typeof(this.props.close) === "function") {
            this.props.close();
        }
        else {
            navigationActions.changePage("Projects");
        }

    },

    cancel: function (){

        this.setUser(this.state.originalUser);
        navigationActions.changePage("Projects");
    },

    render: function () {

        return (
            <div>

                <div className="form center">

                    <div className="row pageonly">

                        <div className="frm">

                            <h2>{resources.YourProfile}</h2>

                        </div>

                    </div>

                    <div className="row">

                        <div className="frm">

                            <label>

                                {resources.ProfileSubHeader}

                            </label>

                        </div>

                    </div>

                    <div className="row pageonly">

                        <div className="frm">

                            <label for="email">
                                {resources.Email}
                            </label>

                            <input type="text" id="email" disabled value={this.state.modifiedUser.email} />

                        </div>

                    </div>

                    <div className="row">

                        <div className="frm frm50">

                            <label for="first_name">
                                {resources.FirstName}
                            </label>

                            <input type="text" id="first_name" value={this.state.modifiedUser.first_name} onChange={this.updateUser} />

                        </div>

                        <div className="frm frm50">

                            <label for="last_name">
                                {resources.LastName}
                            </label>

                            <input type="text" id="last_name" value={this.state.modifiedUser.last_name} onChange={this.updateUser} />

                        </div>

                    </div>

                    <div className="row">

                        <div className="frm frm50">

                            <label for="job_title">
                                {resources.JobTitle}
                            </label>

                            <select id="job_title"  value={this.state.modifiedUser.job_title}  onChange={this.updateUser} >
                                <option value="">{resources.PleaseSelect}</option>
                                <option value="Web Developer">Web Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="Venture Architect">Venture Architect</option>
                                <option value="Partner">Partner</option>
                            </select>

                        </div>

                        <div className="frm frm50">

                            <label for="office">
                                {resources.Office}
                            </label>

                            <select id="office" value={this.state.modifiedUser.office} onChange={this.updateUser}>
                                <option value="">{resources.PleaseSelect}</option>
                                <option value="Berlin">Berlin</option>
                                <option value="London">London</option>
                                <option value="Manhattan Beach">Manhattan Beach</option>
                                <option value="Palo Alto">Palo Alto</option>
                                <option value="Sydney">Sydney</option>
                            </select>

                        </div>

                    </div>

                    <div className="row">

                        <div className="frm frm50">

                            <label for="experience">
                                {resources.Experience}
                                <Tooltip text="ExperienceToolTip" />
                            </label>

                            <textarea id="experience" value={this.state.modifiedUser.experience} onChange={this.updateUser}></textarea>

                        </div>

                        <div className="frm frm50">

                            <Tooltip text="LorumIpsum" />

                            <label for="passions">
                                {resources.Passions}
                                <Tooltip text="PassionsToolTip" />
                            </label>

                            <textarea id="passions" value={this.state.modifiedUser.passions} onChange={this.updateUser}></textarea>

                        </div>

                    </div>

                    <div className="row pageonly">

                        <div className="frm">

                            <button id="submit" onClick={this.saveUser} disabled={this.isInvalid() || !this.isDirty()}>{resources.Save}</button>

                            <button className="cancel" onClick={this.cancel}>{resources.Cancel}</button>

                        </div>

                    </div>


                    <div className="row modalonly">

                        <div className="frm">

                            <button id="submit" onClick={this.saveUser} disabled={this.isInvalid() || !this.isDirty()}>{resources.AddToProfile}</button>

                        </div>

                    </div>


                </div>

            </div>
        )
    }
});