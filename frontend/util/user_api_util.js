var SessionApiActions = require('../actions/session_api_actions');

var UserApiUtil = {
  createUser: function (user) {
    $.ajax({
      method: "POST",
      dataType: "json",
      data: {user: user},
      url: "api/users",
      success: function (user) {
        SessionApiActions.signIn(user);
      },
      error: function (data) {
        console.log("failure.");
      }
    });
  }
};

module.exports = UserApiUtil;
