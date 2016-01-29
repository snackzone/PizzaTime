var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var FlashConstants = require('../constants/flash_constants');

var _notifications = [];
var FlashStore = new Store(AppDispatcher);

FlashStore.all = function () {
  return _notifications.slice();
};

FlashStore.resetNotifications = function(notifications) {
  _notifications = notifications;
};

FlashStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case FlashConstants.RESET_FLASH:
    FlashStore.resetNotifications(payload.flash);
    FlashStore.__emitChange();
    break;
  }
};

module.exports = FlashStore;
