var Dispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');

var ApiActions = {
  receiveAllRestaurants: function(restaurants) {
    Dispatcher.dispatch({
      actionType: RestaurantConstants.RESTAURANTS_RECEIVED,
      restaurants: restaurants
    });
  }
};

module.exports = ApiActions;
