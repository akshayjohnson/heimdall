var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');


var StoryDispatcher = assign(new Dispatcher(), {

    /**
     * A bridge between the views and dispatcher
     * marking the action as a VIEW_ACTION
     * @param  {object} action The data coming from the view
     */
    handleViewAction: function(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }

});

module.exports = StoryDispatcher;
