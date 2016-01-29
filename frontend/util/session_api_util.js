var SessionApiActions = require('../actions/session_api_actions');
var FlashActions = require('../actions/flash_actions');


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

  signOut: function (callback) {
    $.ajax({
      method: "DELETE",
      dataType: "json",
      url: "api/session",
      success: function (data) {
        SessionApiActions.signOut();
        if (callback) {
          callback();
        }
      },
      error: function () {
        console.log("failed to sign out.");
      }
    });
  },

  submitSignInCredentials: function (credentials, successCB) {
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
      error: function (data) {
        FlashActions.receiveFlash(data.responseJSON.errors);
      }
    });
  }
};

module.exports = SessionApiUtil;
