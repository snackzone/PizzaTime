var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');
var CurrentUserConstants = require('../constants/current_user_constants');

var _users = {};
var UserStore = new Store(AppDispatcher);

UserStore.find = function (id) {
  return $.extend({}, _users[id]);
};

UserStore.all = function () {
  return $.extend({}, _users);
};

UserStore.resetUser = function (user) {
  _users[user.id] = user;
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case UserConstants.RECEIVE_USER:
    UserStore.resetUser(payload.user);
    UserStore.__emitChange();
    break;

  case CurrentUserConstants.SIGN_IN:
    _currentUserHasBeenFetched = true;
    UserStore.resetUser(payload.user);
    UserStore.__emitChange();
    break;

  case CurrentUserConstants.UPDATE_INFO:
    UserStore.resetUser(payload.user);
    UserStore.__emitChange();
  }
};

module.exports = UserStore;
