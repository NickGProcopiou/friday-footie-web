/**
 * Created by procopiou_nick on 29/09/2015.
 */

var React = require('react');
var Reflux = require('reflux');

var modalTypes = {

    newuser: require('components/user/profile.jsx')

};

module.exports = React.createClass({

    displayName: 'Modal',

    dismiss: function () {

        if (typeof (this.props.dismissCallback) === "function") {

            this.props.dismissCallback();

        }

    },

    renderModalContent: function () {

        var modalConstructor = modalTypes[this.props.activeModal];

        if(!modalConstructor) {

            return false;

        }

        var modalData = this.props.modalData;

        modalData.close = this.dismiss;

        // make the close callback available to the modal content component so it can be closed from within the content too

        return React.createElement(modalConstructor, modalData);

    },

    renderEmptyModal: function () {

        return (

            <div className="modal">

                <div className="modal-mask"></div>

                <div className="modal-window"></div>

            </div>

        );

    },

    render: function () {

        if(!this.props.activeModal) {

            return this.renderEmptyModal();

        }

        return (

            <div className={"modal " + this.props.activeModal}>

                <div className="modal-mask"></div>

                <div className="modal-window">

                    <div className="inner">

                        <a className="close" onClick={this.dismiss}>

                            <span className="icon"></span>

                        </a>

                        <h2>{this.props.title}</h2>

                        {this.renderModalContent()}

                    </div>

                </div>

            </div>

        )
    }
});