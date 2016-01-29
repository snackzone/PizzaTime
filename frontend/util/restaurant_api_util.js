var RestaurantApiActions = require('../actions/restaurant_api_actions');

var RestaurantApiUtil = {
  fetchRestaurants: function (filters) {
    $.ajax({
      method: "GET",
      dataType: "json",
      data: {filters: filters},
      url: "api/restaurants",
      success: function (data) {
        RestaurantApiActions.receiveAllRestaurants(data);
      },
      error: function () {
        console.log("failed to fetch restaurants from the db.");
      }
    });
  }
};

module.exports = RestaurantApiUtil;
