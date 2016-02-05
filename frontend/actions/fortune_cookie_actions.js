var FortuneCookieConstants = require('../constants/fortune_cookie_constants');
var Dispatcher = require('./../dispatcher/dispatcher');

var FortuneCookieActions = {
  receiveFortuneCookie: function (data) {
    Dispatcher.dispatch({
      actionType: FortuneCookieConstants.RECEIVE_FORTUNE_COOKIE,
      fortuneCookie: data
    });
  }
};

module.exports = FortuneCookieActions;
