var SessionApiActions = require('../actions/session_api_actions');

var SessionApiUtil = {
  fetchCurrentUser: function (callback) {
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "api/session",
      success: function (data) {
        SessionApiActions.signIn(data);
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
        SessionApiActions.signOut();
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
        SessionApiActions.signIn(user);
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

module.exports = SessionApiUtil;
