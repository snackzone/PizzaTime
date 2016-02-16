var FlashActions = require('../actions/flash_actions');
var CurrentUserActions = require('../actions/current_user_actions');

var ReviewApiUtil = {
  submitReview: function (review, callback) {
    $.ajax({
      method: "POST",
      dataType: "json",
      data: {review: review},
      url: "api/reviews/",
      success: function (data) {
        CurrentUserActions.receiveReview(data);

        if (callback) {
          callback(review.restaurant_id);
        }
      }
    });
  },

  updateReview: function (review, callback) {
    $.ajax({
      method: "PUT",
      dataType: "json",
      data: {review: review},
      url: "api/reviews/" + review.id,
      success: function (data) {
        CurrentUserActions.receiveReview(data);

        if (callback) {
          callback();
        }
      }
    });
  },

  deleteReview: function (review, callback) {
    $.ajax({
      method: "DELETE",
      dataType: "json",
      url: "api/reviews/" + review.id,
      success: function (data) {
        CurrentUserActions.deleteReview(review);

        if (callback) {
          callback();
        }
      }
    });
  }
};

module.exports = ReviewApiUtil;
