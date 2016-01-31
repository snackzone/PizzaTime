var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/review_constants');

var _reviews = {};

var ReviewStore = new Store(AppDispatcher);

ReviewStore.all = function () {
  return $.extend({}, _reviews);
};

ReviewStore.loadReviewsForUserId = function (reviews, id) {
  _reviews[id] = reviews;
};

ReviewStore.findReviewsByUserId = function (id) {
  return _reviews[id];
};


ReviewStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case ReviewConstants.REVIEWS_RECEIVED:
    ReviewStore.loadReviewsForUserId(payload.reviews, payload.id);
    ReviewStore.__emitChange();
    break;
  }
};

module.exports = ReviewStore;
