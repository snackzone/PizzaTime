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
      }
    });
  },

  signOut: function (callback) {
    $.ajax({
      method: "DELETE",
      dataType: "json",
      url: "api/session",
      success: function () {
        if (callback) {
          callback();
        }
        SessionApiActions.signOut();
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
