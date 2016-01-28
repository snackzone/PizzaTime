var Dispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');
var CurrentUserConstants = require('../constants/current_user_constants');

var ApiActions = {
  receiveAllRestaurants: function(restaurants) {
    Dispatcher.dispatch({
      actionType: RestaurantConstants.RESTAURANTS_RECEIVED,
      restaurants: restaurants
    });
  },

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

module.exports = ApiActions;
