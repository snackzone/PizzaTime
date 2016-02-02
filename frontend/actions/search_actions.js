var SearchConstants = require('../constants/search_constants');
var Dispatcher = require('./../dispatcher/dispatcher');

var SearchActions = {
  receiveResults: function (data) {
    Dispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_SEARCH_RESULTS,
      searchResults: data.results,
      meta: {totalCount: data.total_count}
    });
  }


};

module.exports = SearchActions;
