var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  createUser: function (user) {
    $.ajax({
      method: "POST",
      dataType: "json",
      data: {user: user},
      url: "api/users",
      success: function (user) {
        ApiActions.signIn(user);
      },
      error: function (data) {
        console.log("failure.");
      }
    });
  },

  fetchCurrentUser: function (callback) {
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "api/session",
      success: function (data) {
        ApiActions.signIn(data);
        if (callback) {
          callback();
        }
      },
      error: function (data) {
        console.log("failure.");
      }
    });
  },

  signOut: function () {
    $.ajax({
      method: "DELETE",
      dataType: "json",
      url: "api/session",
      success: function (data) {
        ApiActions.signOut();
      },
      error: function () {
        console.log("failed to sign out.");
      }
    });
  },

  submitSignInCredentials: function (credentials, successCB, errorCB) {
    $.ajax({
      method: "POST",
      dataType: "json",
      data: {user: credentials},
      url: "api/session",
      success: function (user) {
        console.log("success");
        ApiActions.signIn(user);
        if (successCB) {
          successCB(user.id);
        }
      },
      error: function () {
        console.log("failure.");
      }
    });
  }
};

module.exports = ApiUtil;
