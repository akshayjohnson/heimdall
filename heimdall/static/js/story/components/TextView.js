/** @jsx React.DOM */

var React = require('react');

var StoryConstants = require('../constants/StoryConstants');
var StoryActions = require('../actions/StoryActions');
var Renderer = require('../helpers/renderer');


var TextView = React.createClass({

    propTypes: {
        parentID: React.PropTypes.number.isRequired,
        model: React.PropTypes.object,
        edit: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            edit: false,
            model: {}
        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // we dont allow react to control the component, this
        // results in cursor jumps in the div. However we must
        // be careful that we dont result in inconsistent
        // state between the model and the DOM
        return false;
    },

    render: function() {
        var html = Renderer.toHTML(this.props.model);

        if (this.props.edit) {
            return (
                <p
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

        // TODO
        // 1. Start typing on a selection
        // 2. Backspace/Delete
        // 3. Paste events

        // delete/backspace must be handled here; there is
        // no keypress event for it, also when the user clicks
        // and holds it keydown will fire repeatedly.
        // however, at this point the actual update has
        // __not__ happened in the DOM

    },

    _onKeyUp: function(e) {
        console.log('KeyUp');

        // has the DOM model changed?
        // we are using a quick hack by checking length
        // of the serialized JSON, maybe use deep equal
        // checking of objects?
        var updatedModel = Renderer.fromHTML(this.getDOMNode().innerHTML);

        var jsonModel = JSON.stringify(this.props.model);
        var jsonDOM = JSON.stringify(updatedModel);

        if (jsonModel.length !== jsonDOM.length) {
            StoryActions.updateTextNode(
                this.props.parentID,
                this.props.model.id,
                updatedModel
            );
        }
    }

});

module.exports = TextView;
