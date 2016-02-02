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
        //something needs to happen here.
        if (callback) {
          callback(review.restaurant_id);
        }
      },
      error: function (data) {
        console.log(data.responseJSON.errors);
        FlashActions.receiveFlash(data.responseJSON.errors);
      }
    });
  }
};

module.exports = ReviewApiUtil;
