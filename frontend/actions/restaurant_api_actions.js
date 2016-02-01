var Dispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');

var RestaurantApiActions = {
  receiveAllRestaurants: function(restaurants) {
    Dispatcher.dispatch({
      actionType: RestaurantConstants.RESTAURANTS_RECEIVED,
      restaurants: restaurants
    });
  },

  receiveRestaurant: function(restaurant) {
    Dispatcher.dispatch({
      actionType: RestaurantConstants.RESTAURANT_RECEIVED,
      restaurant: restaurant
    });
  }
};

module.exports = RestaurantApiActions;
