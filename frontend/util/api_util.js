var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  createUser: function (user) {
    $.ajax({
      method: "POST",
      dataType: "json",
      data: {user: user},
      url: "/users",
      success: function (data) {
        ApiActions.signIn(data);
      },
      error: function (data) {
        console.log("failure.");
      }
    });
  },

  fetchCurrentUser: function () {
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "/session",
      success: function (data) {
        ApiActions.signIn(data);
      },
      error: function (data) {
        console.log("failure.");
      }
    });
  },

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
  },

  signOut: function () {
    $.ajax({
      method: "DELETE",
      dataType: "json",
      url: "/session",
      success: function (data) {
        ApiActions.signOut();
      },
      error: function () {
        console.log("failed to sign out.");
      }
    });
  },

  submitSignInCredentials: function (credentials) {
    $.ajax({
      method: "POST",
      dataType: "json",
      data: {user: credentials},
      url: "/session",
      success: function (data) {
        console.log("success");
        ApiActions.signIn(data);
      },
      error: function () {
        console.log("failure.");
      }
    });
  }
};

module.exports = ApiUtil;
