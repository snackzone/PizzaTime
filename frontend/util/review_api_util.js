var ReviewApiActions = require('../actions/review_api_actions');
var FlashActions = require('../actions/flash_actions');

var ReviewApiUtil = {
  //I don't think this is used anywhere.
  fetchReviewsForUser: function (id) {
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "api/users/" + id + "/reviews/",
      success: function (data) {
        ReviewApiActions.receiveReviewsForUser(id, data);
        console.log("success.");
      },
      error: function () {
        console.log("failed to fetch reviews for user " + id);
      }
    });
  },

  submitReview: function (review, callback) {
    $.ajax({
      method: "POST",
      dataType: "json",
      data: {review: review},
      url: "api/reviews/",
      success: function (data) {
        console.log("success!");
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
        console.log("success!");
        if (callback) {
          callback(review.restaurant_id);
        }
      }
    });
  }
};

module.exports = ReviewApiUtil;
