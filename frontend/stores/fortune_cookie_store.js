var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var FortuneCookieConstants = require('../constants/fortune_cookie_constants');

var _fortuneCookie = {};
var FortuneCookieStore = new Store(AppDispatcher);

FortuneCookieStore.fortuneCookie = function () {
  return $.extend({}, _fortuneCookie);
};

FortuneCookieStore.resetFortuneCookie = function (newCookie) {
  _fortuneCookie = newCookie;
};

FortuneCookieStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case FortuneCookieConstants.RECEIVE_FORTUNE_COOKIE:
    FortuneCookieStore.resetFortuneCookie(payload.fortuneCookie);
    FortuneCookieStore.__emitChange();
    break;
  }
};

module.exports = FortuneCookieStore;
