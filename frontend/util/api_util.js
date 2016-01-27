var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchRestaurants: function (filters) {
    $.ajax({
      method: "GET",
      dataType: "json",
      data: {filters: filters},
      url: "api/restaurants",
      success: function (data) {
        ApiActions.receiveAllRestaurants(data);
      },
      error: function () {
        console.log("failed to fetch restaurants from the db.");
      }
    });
  }
};

module.exports = ApiUtil;
