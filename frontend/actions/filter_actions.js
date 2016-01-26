var Dispatcher = require('../dispatcher/dispatcher');
var FilterConstants = require('../constants/filter_constants');

var FilterActions = {
  receiveFilter: function(filter) {
    Dispatcher.dispatch({
      actionType: FilterConstants.UPDATE_FILTER,
      filter: filter
    });
  }
};

module.exports = FilterActions;
