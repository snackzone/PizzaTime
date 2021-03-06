var Dispatcher = require('../dispatcher/dispatcher');
var CurrentUserConstants = require('../constants/current_user_constants');

var SessionApiActions = {
  signOut: function () {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.SIGN_OUT,
    });
  },

  signIn: function (user) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.SIGN_IN,
      user: user
    });
  }
};

module.exports = SessionApiActions;
