/** @jsx React.DOM */

var React = require('react');

var TextView = require('../components/TextView');


var nodeMap = {
    'text': TextView
};

var TextLayout = React.createClass({
    propTypes: {
        model: React.PropTypes.object,
        edit: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            model: {
                layout: 'TextLayout',
                nodes: []
            },
            edit: false
        };
    },

    render: function() {
        var self = this;

        var nodes = [];
        this.props.model.nodes.forEach(function(node) {
            var Node = nodeMap[node.type];
            if (Node === undefined) {
                console.error('Invalid Node: ' + node.type);
                return;
            }

            nodes.push(<Node
                model={node}
                edit={self.props.edit}
                key={node.id}
                parentID={self.props.model.id}
            />);
        });

        return (
            <section className="text-layout">
                {nodes}
            </section>
        );
    }
});

module.exports = TextLayout;
