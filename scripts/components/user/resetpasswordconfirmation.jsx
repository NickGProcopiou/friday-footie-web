/**
 * Created by procopiou_nick on 23/10/2015.
 */

var React = require('react');
var Reflux = require('reflux');

module.exports = React.createClass({

    displayName: 'ResetPasswordConfirmation',

    render: function () {

        return (
            <div className="form">

                <h1>Check your email</h1>

                <div className="row">

                    <div className="frm">

                        <p>
                            Please check your email to <br />
                            change your password
                        </p>

                    </div>

                </div>

            </div>
        )
    }
});