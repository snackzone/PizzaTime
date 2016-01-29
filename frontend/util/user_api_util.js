var SessionApiActions = require('../actions/session_api_actions');
var FlashActions = require('../actions/flash_actions');
var CurrentUserActions = require('../actions/current_user_actions');

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
      success: function (photo) {
        CurrentUserActions.receivePhoto(photo);
      },
      error: function () {
        console.log("failed to upload photo.");
      }
    });
  }
};

module.exports = UserApiUtil;
