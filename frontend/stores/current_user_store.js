var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var CurrentUserConstants = require('../constants/current_user_constants');

var current_user = {};
var CurrentUserStore = new Store(AppDispatcher);

CurrentUserStore.currentUser = function () {
  return $.extend({}, current_user);
};

CurrentUserStore.signOut = function () {
  current_user = null;
};

CurrentUserStore.loggedInStatus = function () {
  return current_user ? true : false;
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
