var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var _story = {
    gid: 3,
    sections: [
        {
            id: 0,
            layout: 'TextLayout',
            nodes: [
                {
                    id: 1,
                    type: 'text',
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
                }
            ]
        }
    ]
};

var StoryStore = assign({}, EventEmitter.prototype, {

    /**
     * Gets the sections associated with this story
     * @return {Array<object>} Array of section objects
     */
    getSections: function() {
        return _story.sections;
    }

});

module.exports = StoryStore;
