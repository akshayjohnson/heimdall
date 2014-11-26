/** @jsx React.DOM */

var React = require('react');

var StoryConstants = require('../constants/StoryConstants');
var StoryActions = require('../actions/StoryActions');
var Renderer = require('../helpers/renderer');


var TextView = React.createClass({

    propTypes: {
        model: React.PropTypes.object,
        edit: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            edit: false,
            model: {}
        };
    },

    render: function() {
        console.log(this.props);
        var html = Renderer.toHTML(this.props.model);

        if (this.props.edit) {
            return (
                <p
                    ref="el"
                    contentEditable="true"

                    onKeyPress={this._onKeyPress}
                    onKeyDown={this._onKeyDown}
                    onKeyUp={this._onKeyUp}
                    dangerouslySetInnerHTML={{__html: html}}>
                </p>
            );
        } else {
            return (
                <p
                    dangerouslySetInnerHTML={{__html: html}}>
                </p>
            );
        }
    },

    _onKeyPress: function(e) {
        console.log('KeyPress');
    },

    _onKeyDown: function(e) {
        console.log('KeyDown');

    },

    _onKeyUp: function(e) {
        console.log('KeyUp');

        // has the DOM model changed?
        // we are using a quick hack by checking length
        // of the serialized JSON, maybe use deep equal
        // checking of objects?
        var jsonModel = JSON.stringify(this.props.model);
        var jsonDOM = JSON.stringify(Renderer.fromHTML(this.refs.el.getDOMNode().innerHTML));

        if (jsonModel.length === jsonDOM.length) {
            StoryActions.changeStoryText()
        } else {
            console.log('Change');
        }
    },

});

module.exports = TextView;
