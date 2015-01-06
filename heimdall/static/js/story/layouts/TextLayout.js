/** @jsx React.DOM */

var React = require('react');

var TextView = require('../components/TextView');


var nodeMap = {
    'text': TextView
};

var TextLayout = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
        edit: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            edit: false
        };
    },

    componentWillReceiveProps: function(nextProps) {
        var model = nextProps.model;

        // do some bookkeeping on the model
        if (model.nodes.length !== 0) {
            model.nodes[0].deleteOnEmpty = false;
        }

        this.setState({model: model});
    },

    render: function() {
        var self = this;

        var nodes = [];

        // the state.model is the source of truth which should
        // be used rather than prop.model
        this.state.model.nodes.forEach(function(node) {
            var Node = nodeMap[node.type];
            if (Node === undefined) {
                console.error('Invalid Node: ' + node.type);
                return;
            }

            nodes.push(<Node
                model={node}
                edit={self.props.edit}
                key={node.id}
                parentID={self.state.model.id}
                parent={self}
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
