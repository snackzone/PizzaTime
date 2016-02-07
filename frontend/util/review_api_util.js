var ReviewApiActions = require('../actions/review_api_actions');
var FlashActions = require('../actions/flash_actions');
var SessionApiUtil = require('./session_api_util');

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

        //should prepend review to store instead of refetching restaurant

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

        FlashActions.receiveFlash(data.message);

        if (callback) {
          callback(review.restaurant_id);
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
        SessionApiUtil.fetchCurrentUser();

        if (callback) {
          callback(review.restaurant.id);
        }
      },
      error: function () {
        console.log("failed to delete review.");
      }
    });
  }
};

module.exports = ReviewApiUtil;
