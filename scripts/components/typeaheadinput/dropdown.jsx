/**
 * Created by procopiou_nick on 23/09/2015.
 */

var React = require("react");
var HighlightText = require("components/highlighttext/index.jsx");

module.exports = React.createClass({

    render: function() {

        var that = this;

        var words = this.props.search.trim().split(" "),
            search = this.props.search,
            searchArg = "",
            originalData = this.props.data,
            filteredData = [],
            regex,
            filteredDataHtml = <li>No users found</li>

        for (var h = 0; h < words.length; h++) {
            searchArg += '(?=.*' + words[h] + ')';
        }

        regex = new RegExp(searchArg, "i");

        for (var i = 0, l = originalData.length; i < l; ++i) {

            var searchString = "";

            var searchStringPropertiesArr = that.props.searchStringProperties.split(",");
            searchStringPropertiesArr.forEach(function(prop){

                searchString += originalData[i][prop] + " ";
            });

            if (searchString.match(regex) !== null) {
                filteredData.push(originalData[i]);
            }
            if (filteredData.length === 5){
                break;
                // max 5
            }
        }

        if (filteredData.length > 0) {
            filteredDataHtml = filteredData.map(function (item, i) {

                var string = "";
                var selectionText = "";

                var selectionStringPropertiesArr = that.props.selectionStringProperties.split(",");

                var searchStringPropertiesArr = that.props.searchStringProperties.split(",");
                searchStringPropertiesArr.forEach(function(prop){

                    string += (item[prop] || "")  + " ";
                });

                selectionStringPropertiesArr.forEach(function(prop){

                    selectionText += (item[prop] || "") + " ";
                });

                var className = i === 0 ? "selected" : "";

                return (
                    <li className={className} data-selection-data={item.id} data-selection-text={selectionText}>
                        <HighlightText string={string} search={search}/>
                    </li>
                )
            });
        }

        return (
            <ul className="dropdown">
                {filteredDataHtml}
            </ul>
        )
    }

});