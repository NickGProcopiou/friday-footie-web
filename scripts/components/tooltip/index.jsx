
var resources = require("utils/resources");

module.exports = React.createClass({

    displayName: 'Tooltip',

    render: function(){

        return (

            <a className="tooltip">

                <span className="text">{resources[this.props.text]}</span>

            </a>
        )
    }
})