var ReviewApiActions = require('../actions/review_api_actions');

var ReviewApiUtil = {
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
  }
};

module.exports = ReviewApiUtil;
