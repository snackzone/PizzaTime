var Dispatcher = require('../dispatcher/dispatcher');
var FlashConstants = require('../constants/flash_constants');

var FlashActions = {
  receiveFlash: function(flash) {
    Dispatcher.dispatch({
      actionType: FlashConstants.RESET_FLASH,
      flash: flash
    });
  }
};

module.exports = FlashActions;
