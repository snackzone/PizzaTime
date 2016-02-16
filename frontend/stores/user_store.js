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

UserStore.deletePhoto = function (photo) {
  var user = _users[photo.user_id];

  for (var i = 0; i < user.photos.length; i++) {
    if (photo.id == user.photos[i].id) {
      user.photos.splice(i, 1);
      break;
    }
  }
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case UserConstants.RECEIVE_USER:
    UserStore.resetUser(payload.user);
    UserStore.__emitChange();
    break;

  case UserConstants.DELETE_PHOTO:
    UserStore.deletePhoto(payload.photo);
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
