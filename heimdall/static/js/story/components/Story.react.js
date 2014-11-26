var React = require('react');

var StoryStore = require('../stores/StoryStore');
var TextLayout = require('../layouts/TextLayout');


// Map mapping layout names to the classes
var layoutsMap = {
    'TextLayout': TextLayout
};

/**
 * Gets the story object we need from the store
 * @return {object} Story Object
 */
function getStory() {
    return {
        sections: StoryStore.getSections(),
        edit: true
    };
}

var Story = React.createClass({

    getInitialState: function() {
        return getStory();
    },

    componentWillMount: function() {
        StoryStore.addChangeListener(this.storyChanged);
    },

    componentWillUnmount: function() {
        StoryStore.removeChangeListener(this.storyChanged);
    },

    storyChanged: function() {
        console.log('Story Changed');
        this.setState(getStory());
    },

    render: function() {
        var self = this;

        var sections = [];
        this.state.sections.forEach(function(section) {
            var Layout = layoutsMap[section.layout];
            if (Layout === undefined) {
                console.error('Invalid Layout: ' + section.layout);
                return;
            }

            sections.push(<Layout
                model={section}
                edit={self.state.edit}
                key={section.id}
            />);
        });

        return (
            <div className="story-main">
                {sections}
            </div>
        );
    }

});

module.exports = Story;
