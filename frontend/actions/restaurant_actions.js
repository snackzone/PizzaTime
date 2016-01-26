var Dispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');

var RestaurantActions = {
  focusRestaurant: function(e) {
    var id = parseInt(e.currentTarget.id);
    Dispatcher.dispatch({
      actionType: RestaurantConstants.FOCUS_RESTAURANT,
      restaurantId: id
    });
  },
  unfocusAllRestaurants: function() {
    Dispatcher.dispatch({
      actionType: RestaurantConstants.UNFOCUS_ALL_RESTAURANTS
    });
  }
};

module.exports = RestaurantActions;
