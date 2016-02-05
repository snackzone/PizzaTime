var FortuneCookieActions = require('../actions/fortune_cookie_actions');

var FortuneCookieApiUtil = {

  fetchCookie: function (callback) {
    $.ajax({
      url: '/api/fortune_cookie',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        FortuneCookieActions.receiveFortuneCookie(data);
        if (callback) {
          callback();
        }
      }
    });
  }

};


module.exports = FortuneCookieApiUtil;
