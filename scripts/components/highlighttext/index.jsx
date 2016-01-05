/**
 * Created by procopiou_nick on 23/09/2015.
 */

var React = require('react');

module.exports = React.createClass({

    displayName: 'HighlightText',

    render: function () {

        var string = this.props.string;
        var search = this.props.search || '';

        if (string && search != "") {

            string = string.toString();
            search = search.toString();

            var searchArg = "(" + search.replace(/ /g, "|") + ")",

                ar = string.split(" "),
                result = "",
                regex = new RegExp(searchArg, "i");

            for (var x = 0; x < ar.length; x++) {

                result += ar[x].replace(regex, "<span class='highlight'>$1</span>");
                if (x < (ar.length - 1)) {
                    result += " ";
                }
            }

            string = result;

        }

        return (

            <span dangerouslySetInnerHTML={{__html: string}} />

        );

    }

});

