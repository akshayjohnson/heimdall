var StoryDispatcher = require('../dispatcher/StoryDispatcher');
var StoryConstants = require('../constants/StoryConstants');


var StoryActions = {
    /**
     * A text component has changed
     * @param  {string} layoutID    The layout ID
     * @param  {string} componentID The component ID
     * @param  {object} dataObject  The model of the text field that changed
     */
    changeStoryText: function(layoutID, componentID, dataObject) {
        console.log(arguments);
    }
}
