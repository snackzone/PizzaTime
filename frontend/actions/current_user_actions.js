var Dispatcher = require('../dispatcher/dispatcher');
var CurrentUserConstants = require('../constants/current_user_constants');

var CurrentUserActions = {
  receiveNewUser: function(user) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.UPDATE_INFO,
      user: user
    });
  },

  receiveReview: function(review) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.RECEIVE_REVIEW,
      review: review
    });
  },

  deleteReview: function (review) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.DELETE_REVIEW,
      review: review
    });
  }
};

module.exports = CurrentUserActions;
