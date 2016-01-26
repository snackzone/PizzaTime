var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');

var _restaurants = [];
var _focusedRestaurants = [];

var RestaurantStore = new Store(AppDispatcher);

RestaurantStore.all = function () {
  return _restaurants.slice();
};

RestaurantStore.loadRestaurants = function(restaurants) {
  _restaurants = restaurants;
};

RestaurantStore.focusRestaurantById = function(id) {
  var restaurant = RestaurantStore.findById(id);
  if (restaurant) {
    restaurant.focused = true;
    _focusedRestaurants.push(restaurant);
  }
};

RestaurantStore.focusedRestaurants = function () {
  return _focusedRestaurants.slice();
};

RestaurantStore.unfocusAllRestaurants = function(id) {
  for(var i = 0; i < _focusedRestaurants.length; i++) {
    var restaurant = _focusedRestaurants[i];
    restaurant.focused = false;
  }
  _focusedRestaurants = [];
};

RestaurantStore.findById = function(id) {
  for (var i=0; i<_restaurants.length; i++) {
    var restaurant = _restaurants[i];
    if (restaurant.id === id) {
      return restaurant;
    }
  }
};

RestaurantStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case RestaurantConstants.RESTAURANTS_RECEIVED:
    RestaurantStore.loadRestaurants(payload.restaurants);
    RestaurantStore.__emitChange();
    break;

  case RestaurantConstants.FOCUS_RESTAURANT:
    RestaurantStore.focusRestaurantById(payload.restaurantId);
    RestaurantStore.__emitChange();
    break;

  case RestaurantConstants.UNFOCUS_ALL_RESTAURANTS:
    RestaurantStore.unfocusAllRestaurants();
    RestaurantStore.__emitChange();
    break;
  }
};

module.exports = RestaurantStore;
