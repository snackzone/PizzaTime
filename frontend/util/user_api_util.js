var SessionApiActions = require('../actions/session_api_actions');
var FlashActions = require('../actions/flash_actions');
var CurrentUserActions = require('../actions/current_user_actions');
var UserApiActions = require('../actions/user_api_actions');
var RestaurantApiActions = require('../actions/restaurant_api_actions');

var UserApiUtil = {
  createUser: function (user, successCB) {
    $.ajax({
      method: "POST",
      dataType: "json",
      data: {user: user},
      url: "api/users",
      success: function (user) {
        SessionApiActions.signIn(user);

        if (successCB) {
          successCB(user.id);
        }
      },
      error: function (data) {
        FlashActions.receiveFlash(data.responseJSON.errors);
      }
    });
  },

  updateAvatar: function (formData, id, callback) {
    $.ajax({
      method: "PATCH",
      url: "api/users/" + id,
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function (user) {
        CurrentUserActions.receiveNewUser(user);
        if (callback) {
          callback();
        }
      }
    });
  },

  updateInfo: function (user) {
    $.ajax({
      method: "PATCH",
      dataType: "json",
      data: {user: user},
      url: "api/users/" + user.id,
      success: function (user) {
        CurrentUserActions.receiveNewUser(user);
        FlashActions.receiveFlash(["Profile updated!"]);
      },
      error: function (data) {
        FlashActions.receiveFlash(data.responseJSON.errors);
      }
    });
  },

  uploadRestaurantPhoto: function (id, formData, callback) {
    $.ajax({
      method: "POST",
      url: "api/restaurants/" + id + "/photos",
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function(photo) {
        RestaurantApiActions.addPhoto(photo);

        if (callback) {
          callback();
        }
      }
    });
  },

  deleteRestaurantPhoto: function (photo, callback) {
    $.ajax({
      method: "DELETE",
      url: "api/photos/" + photo.id,
      dataType: "json",
      success: function(photo) {
        CurrentUserActions.deletePhoto(photo);

        if (callback) {
          callback();
        }
      }
    });
  },

  fetchById: function (id, callback) {
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "api/users/" + id,
      success: function (user) {
        UserApiActions.receiveUser(user);
        if (callback) {
          callback();
        }
      }
    });
  }
};

module.exports = UserApiUtil;
