var SessionApiActions = require('../actions/session_api_actions');
var FlashActions = require('../actions/flash_actions');
var CurrentUserActions = require('../actions/current_user_actions');
var UserApiActions = require('../actions/user_api_actions');

var UserApiUtil = {
  createUser: function (user, successCB) {
    $.ajax({
      method: "POST",
      dataType: "json",
      data: {user: user},
      url: "api/users",
      success: function (user) {
        SessionApiActions.signIn(user, successCB);
      },
      error: function (data) {
        console.log("failure.");
        FlashActions.receiveFlash(data.responseJSON.errors);
      }
    });
  },

  updatePhoto: function (formData, id) {
    $.ajax({
      method: "PATCH",
      url: "api/users/" + id,
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function (user) {
        CurrentUserActions.receiveNewInfo(user);
      },
      error: function () {
        console.log("failed to upload photo.");
      }
    });
  },

  updateInfo: function (user, successCB) {
    $.ajax({
      method: "PATCH",
      dataType: "json",
      data: {user: user},
      url: "api/users/" + user.id,
      success: function (user) {
        CurrentUserActions.receiveNewInfo(user);
        FlashActions.receiveFlash(["Profile updated!"]);
      },
      error: function (data) {
        console.log("failure.");
        FlashActions.receiveFlash(data.responseJSON.errors);
      }
    });
  },

  fetchById: function (id) {
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "api/users/" + id,
      success: function (user) {
        UserApiActions.receiveUser(user);
        console.log("success");
      },
      error: function (data) {
        console.log("failed to fetch user id " + id);
      }
    });
  }
};

module.exports = UserApiUtil;
