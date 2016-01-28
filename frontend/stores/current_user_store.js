var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var CurrentUserConstants = require('../constants/current_user_constants');

var _current_user = {};
var CurrentUserStore = new Store(AppDispatcher);

CurrentUserStore.currentUser = function () {
  if (_current_user) {
    return $.extend({}, current_user);
  } else {
    return null;
  }
};

CurrentUserStore.signOut = function () {
  _current_user = null;
};

CurrentUserStore.loggedInStatus = function () {
  return _current_user ? true : false;
};

CurrentUserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case CurrentUserConstants.SIGN_OUT:
    CurrentUserStore.signOut();
    CurrentUserStore.__emitChange();
    break;
  }
};

module.exports = CurrentUserStore;
