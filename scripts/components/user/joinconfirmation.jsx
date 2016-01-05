/**
 * Created by procopiou_nick on 12/10/2015.
 */

var React = require('react');
var Reflux = require('reflux');

var resources = require('utils/resources');

module.exports = React.createClass({

    displayName: 'JoinConfirmation',

    render: function () {

        return (
            <div className="form">

                <h1>{resources.AlmostThere}</h1>

                <div className="row">

                    <div className="frm">

                        <p>
                            {resources.JoinConfirmationCheckYourEmail}
                        </p>

                    </div>

                </div>

            </div>
        )
    }
});