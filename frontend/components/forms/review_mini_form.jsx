var CurrentUserStore = require('../../stores/current_user_store');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var RatingSelector = require('./rating_selector');
var React = require('react');
var ReactRouter = require('react-router');
var RestaurantApiUtil = require('../../util/restaurant_api_util');
var RestaurantStore = require('../../stores/restaurant_store');
var ReviewApiUtil = require('../../util/review_api_util');
var ReviewIndex = require('../restaurants/restaurant_review_index');
var SessionApiUtil = require('../../util/session_api_util');


var ReviewSubmitButton = require('./review_submit_button');


var ReviewForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    if (this.props.isUpdate) {
      var review = this.review = CurrentUserStore.findReview(this.props.restaurantId);
      return ({
        loaded: false,
        body: review.body,
        rating: parseInt(review.rating) - 1,
        ratingSet: true
      });
    }

    return ({
      loaded: false,
      body: "",
      rating: -1,
      ratingSet: false
    });
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var review = {
      body:           this.state.body,
      restaurant_id:  this.props.restaurantId,
      user_id:        CurrentUserStore.currentUser().id,
      rating:         parseInt(this.state.rating) + 1
    };

    if (this.isUpdate) {
      review.id = this.review.id;

      ReviewApiUtil.updateReview(
        review, this.props.successCB
      );

    } else {
      ReviewApiUtil.submitReview(
        review, this.props.successCB
      );
    }
  },

  flashSaved: function () {
    console.log("saved.");
  },

  handleRating: function (rating) {
    this.setState({
      rating: rating,
      ratingSet: true
    });
  },

  render: function () {

    return (
      <form className="review-form group" onSubmit={this.handleSubmit}>


        <div className="review-form-body">

          <RatingSelector
            rating={this.state.rating}
            ratingSet={this.state.ratingSet}
            handleClick={this.handleRating}
          />

          <textarea
            valueLink={this.linkState('body')}
            placeholder="Write your review here!">
          </textarea>

          <ReviewSubmitButton
            length={this.state.body.length}
            rated={this.state.ratingSet}
            isUpdate={this.props.isUpdate}
          />

        </div>

      </form>
    );
  }
});

module.exports = ReviewForm;
