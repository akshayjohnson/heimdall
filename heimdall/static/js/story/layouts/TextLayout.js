/** @jsx React.DOM */

var React = require('react');

var TextView = require('../components/TextView');


var TextLayout = React.createClass({
    render: function() {
        var model = {
            text: 'Hello World',
            meta: [
                {
                    type: 'bold',
                    selection: [0, 5]
                },
                {
                    type: 'italic',
                    selection: [0, 5]
                },
                {
                    type: 'bold',
                    selection: [6, 8]
                }
            ]
        };

        return (
            <section>
                <TextView edit={true} model={model} />
            </section>
        );
    }
})

module.exports = TextLayout;
