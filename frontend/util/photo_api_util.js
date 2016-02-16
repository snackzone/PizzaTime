var UserApiActions = require('../actions/user_api_actions');
var RestaurantApiActions = require('../actions/restaurant_api_actions');

var PhotoApiUtil = {
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
      success: function() {
        UserApiActions.deletePhoto(photo);

        if (callback) {
          callback();
        }
      }
    });
  }
};

module.exports = PhotoApiUtil;
