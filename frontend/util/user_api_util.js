var SessionApiActions = require('../actions/session_api_actions');
var FlashActions = require('../actions/flash_actions');

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
  }
};

module.exports = UserApiUtil;
