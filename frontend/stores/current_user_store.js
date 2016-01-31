var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var CurrentUserConstants = require('../constants/current_user_constants');

var _currentUser = {};
var _currentUserHasBeenFetched = false;
var CurrentUserStore = new Store(AppDispatcher);

CurrentUserStore.currentUser = function () {
  if (Object.keys(_currentUser).length === 0) {
    return false;
  } else {
    return $.extend({}, _currentUser);
  }
};

CurrentUserStore.signIn = function (user) {
  _currentUser = user;
};

CurrentUserStore.signOut = function () {
  _currentUser = {};
};

CurrentUserStore.isLoggedIn = function () {
  return !!_currentUser.id;
};

CurrentUserStore.isCurrentUser = function (id) {
  return _currentUser.id == id;
};

CurrentUserStore.userHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

CurrentUserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case CurrentUserConstants.SIGN_OUT:
    CurrentUserStore.signOut();
    CurrentUserStore.__emitChange();
    break;

  case CurrentUserConstants.SIGN_IN:
    _currentUserHasBeenFetched = true;
    CurrentUserStore.signIn(payload.user);
    CurrentUserStore.__emitChange();
    break;

  case CurrentUserConstants.UPDATE_INFO:
    CurrentUserStore.signIn(payload.user);
    CurrentUserStore.__emitChange();
  }
};

module.exports = CurrentUserStore;
