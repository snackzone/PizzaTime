var Dispatcher = require('../dispatcher/dispatcher');
var CurrentUserConstants = require('../constants/current_user_constants');

var CurrentUserActions = {
  receiveNewInfo: function(user) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.UPDATE_INFO,
      user: user
    });
  }
};

module.exports = CurrentUserActions;
