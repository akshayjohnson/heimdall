var StoryDispatcher = require('../dispatcher/StoryDispatcher');
var StoryConstants = require('../constants/StoryConstants');


var StoryActions = {
    /**
     * A text component has changed
     * @param  {string} sectionID   The section ID
     * @param  {string} nodeID      The node ID
     * @param  {object} dataObject  The model of the text field that changed
     */
    updateTextNode: function(sectionID, nodeID, model) {
        StoryDispatcher.handleViewAction({
            actionType: StoryConstants.STORY_UPDATE_TEXT,
            sectionID: sectionID,
            nodeID: nodeID,
            model: model
        });
    },

    /**
     * Deletes the given node
     * @param  {number} sectionID SectionID
     * @param  {number} nodeID    NodeID
     */
    deleteNode: function(sectionID, nodeID) {
        StoryDispatcher.handleViewAction({
            actionType: StoryConstants.DELETE_NODE,
            sectionID: sectionID,
            nodeID: nodeID
        });
    },
};

module.exports = StoryActions;
