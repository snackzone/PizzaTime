var Dispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/review_constants');

var ReviewApiActions = {
  receiveReviewsForUser: function(id, reviews) {
    Dispatcher.dispatch({
      actionType: ReviewConstants.REVIEWS_RECEIVED,
      reviews: reviews,
      id: id
    });
  }
};

module.exports = ReviewApiActions;
