var Dispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');

var UserApiActions = {
  receiveUser: function (user) {
    Dispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USER,
      user: user
    });
  },

  deletePhoto: function (photo) {
    Dispatcher.dispatch({
      actionType: UserConstants.DELETE_PHOTO,
      photo: photo
    });
  }
};

module.exports = UserApiActions;
