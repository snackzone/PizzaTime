var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');

var _restaurants = [];
var RestaurantStore = new Store(AppDispatcher);

RestaurantStore.all = function () {
  return _restaurants.slice();
};

RestaurantStore.loadRestaurants = function(restaurants) {
  _restaurants = restaurants;
};

RestaurantStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case RestaurantConstants.RESTAURANTS_RECEIVED:
    RestaurantStore.loadRestaurants(payload.restaurants);
    RestaurantStore.__emitChange();
    break;
  }
};
