var Dispatcher = require('../dispatcher/dispatcher');
var CurrentUserConstants = require('../constants/current_user_constants');

var CurrentUserActions = {
  receivePhoto: function(user) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.UPDATE_PHOTO,
      photo_url: user.photo_url
    });
  }
};

module.exports = CurrentUserActions;
