/**
 * Created by procopiou_nick on 23/09/2015.
 */

var React = require("react");
var $ = require("jquery");
var Dropdown = require("./dropdown.jsx");

module.exports = React.createClass({

    displayName: 'Typeaheadinput',

    getInitialState: function(){

        return {
            search: ""
        }

    },

    keyCodes: {enter: 13, up: 38, down: 40},

    componentDidMount: function(){

        var that = this;

        $(".typeaheadinput").keydown(function(e){

            var list = $(this).find("ul");
            var listItems = list.find("li");
            var currentHighlight = list.find(".selected");
            var currentHighlightIndex = currentHighlight.index("li");

            if (e.keyCode === that.keyCodes.up || e.keyCode === that.keyCodes.down) {

                listItems.removeClass("selected");

                if (e.keyCode === that.keyCodes.up) {
                    // up arrow
                    listItems.eq(currentHighlightIndex - 1 < 0 ? listItems.length - 1 : currentHighlightIndex - 1).addClass("selected");
                }

                if (e.keyCode === that.keyCodes.down) {
                    // down arrow
                    listItems.eq(currentHighlightIndex + 1 > listItems.length - 1 ? 0 : currentHighlightIndex + 1).addClass("selected");
                }

            }

            if (e.keyCode === that.keyCodes.enter){

                that.makeTypeAheadSelection(currentHighlight);
            }


        });

        $(".typeaheadinput").on("click", ".dropdown li", function(){

            that.makeTypeAheadSelection($(this));

        });
    },

    changeSearch: function(e){

        this.setState({search: e.target.value});

    },

    makeTypeAheadSelection: function(el){

        var text = el.data("selection-text");
        var data = el.data("selection-data");

        if (typeof(this.props.onChange) === "function") {
            this.props.onChange(data);
        }
    },

    focusHandler: function(){
        this.setState({focus: true});
    },

    blurHandler: function(){

        var that = this;

        setTimeout(function(){
            that.setState({focus: false});
        }, 150);
    },

    renderTypeAhead: function(){

        if (this.state.search === "") {
            return false;
        }

        return (

            <Dropdown data={this.props.data}
                      search={this.state.search}
                      selectionStringProperties={this.props.selectionStringProperties}
                      searchStringProperties={this.props.searchStringProperties}
                />
        )
    },

    render: function(){

        var typeAheadContainerClass = "typeaheadinput";
        typeAheadContainerClass += this.state.focus ? " focus" : "";

        return (
            <div className={typeAheadContainerClass}>
                <input type="text" id={this.props.id} onChange={this.changeSearch} value={this.state.search} onFocus={this.focusHandler} onBlur={this.blurHandler} />

                {this.renderTypeAhead()}
            </div>
        )

    }
})