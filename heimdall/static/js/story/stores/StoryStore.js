var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var StoryDispatcher = require('../dispatcher/StoryDispatcher');
var StoryConstants = require('../constants/StoryConstants');


// a test story object
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
                },
                {
                    id: 2,
                    type: 'text',
                    text: 'This is the second node',
                    meta: []
                }
            ]
        }
    ]
};


// helpers
function _findInArray(array, id) {
    var i;

    for (i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return i;
        }
    }

    return undefined;
}


// methods which handle actions

/**
 * Updats a text node, assumes model has the text and meta
 * fields
 * @param  {number} sectionID section Id
 * @param  {number} nodeID    node Id within section
 * @param  {object} model     the model object
 */
function updateTextNode(sectionID, nodeID, model) {
    var sectionIndex = _findInArray(_story.sections, sectionID);
    if (sectionIndex === undefined) {
        console.error('Updating Invalid section');
        console.error(arguments);
        return;
    }

    var nodeIndex = _findInArray(_story.sections[sectionIndex].nodes, nodeID);
    if (nodeIndex === undefined) {
        console.error('Updating Invalid Node');
        console.error(arguments);
        return;
    }

    var obj = _story.sections[sectionIndex].nodes[nodeIndex];
    obj.text = model.text;
    obj.meta = model.meta;
}

/**
 * Deletes the given node
 * @param  {number} sectionID SectionID
 * @param  {number} nodeID    Node Id
 */
function deleteNode(sectionID, nodeID) {
    var sectionIndex = _findInArray(_story.sections, sectionID);
    if (sectionIndex === undefined) {
        console.error('Deleting invalid node');
        console.error(arguments);
        return;
    }

    var nodeIndex = _findInArray(_story.sections[sectionIndex].nodes, nodeID);
    if (nodeIndex === undefined) {
        console.error('Deleting invalid node');
        console.error(arguments);
        return;
    }

    _story.sections[sectionIndex].nodes.splice(nodeIndex, 1);
}


// story store instance
var StoryStore = assign({}, EventEmitter.prototype, {

    /**
     * Gets the sections associated with this story
     * @return {Array<object>} Array of section objects
     */
    getSections: function() {
        return _story.sections;
    },


    // event handling
    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});


// Handle dispatcher events
StoryDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
    case StoryConstants.STORY_UPDATE_TEXT:
        updateTextNode(action.sectionID, action.nodeID, action.model);
        break;

    case StoryConstants.DELETE_NODE:
        deleteNode(action.sectionID, action.nodeID);
        break;

    default:
        return true;
    }

    StoryStore.emitChange();
    return true;
});


module.exports = StoryStore;
