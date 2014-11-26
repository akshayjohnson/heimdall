var React = require('react');

var Story = require('./components/Story.react');


var StoryTeller = {
    /**
     * Initializes the story display
     */
    init: function() {
        React.render(
            <Story />,
            document.getElementById('story')
        );
    }
};

module.exports = StoryTeller;
