var CurrentUserStore = require('../../stores/current_user_store');
var DeleteReviewButton = require('./delete_review_button');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var RatingSelector = require('./rating_selector');
var React = require('react');
var ReactRouter = require('react-router');
var RestaurantApiUtil = require('../../util/restaurant_api_util');
var RestaurantStore = require('../../stores/restaurant_store');
var ReviewApiUtil = require('../../util/review_api_util');
var ReviewIndex = require('../restaurants/restaurant_review_index');
var ReviewSubmitButton = require('./review_submit_button');


var ReviewForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    window.scrollTo(0, 0);

    var review = this.review = CurrentUserStore.findReview(this.props.params.id);
    var restaurant = RestaurantApiUtil.fetchRestaurant(this.props.params.id, this.change);
    this.isUpdate = !!review;

    if (this.isUpdate) {
      return ({
        restaurant: restaurant,
        loaded: false,
        body: review.body,
        rating: parseInt(review.rating) - 1,
        ratingSet: true,
        flash: "",
        posted: false
      });
    } else {
      return ({
        restaurant: restaurant,
        loaded: false,
        body: "",
        rating: -1,
        ratingSet: false,
        flash: "",
        posted: false
      });
    }
  },

  componentDidMount: function () {
    this.restaurantListener = RestaurantStore.addListener(this.change);
  },

  componentWillUnmount: function () {
    this.restaurantListener.remove();
  },

  componentWillReceiveProps: function (nextProps) {
    var review = this.review = CurrentUserStore.findReview(nextProps.params.id);
    var restaurant = RestaurantApiUtil.fetchRestaurant(nextProps.params.id, this.change);
    this.isUpdate = !!review;

    if (this.isUpdate) {
      this.setState({
        restaurant: restaurant,
        loaded: false,
        body: review.body,
        rating: parseInt(review.rating) - 1,
        ratingSet: true,
        flash: "",
        posted: false
      });
    } else {
      this.setState({
        restaurant: restaurant,
        loaded: false,
        body: "",
        rating: -1,
        ratingSet: false,
        flash: "",
        posted: false
      });
    }
  },

  change: function () {
    this.setState({
      restaurant: RestaurantStore.findById(this.props.params.id),
      loaded: true
    });
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var review = {
      body:           this.state.body,
      restaurant_id:  this.state.restaurant.id,
      user_id:        CurrentUserStore.currentUser().id,
      rating:         parseInt(this.state.rating) + 1
    };

    if (this.isUpdate) {
      review.id = this.review.id;
      ReviewApiUtil.updateReview(review, this.updateFlash);

    } else {
      var that = this;

      ReviewApiUtil.submitReview(
        review, function successCB (id) {
          that.setState({posted: true});
          window.setTimeout(function () {
            that.history.pushState({}, "restaurants/" + id);
            that.setState({body: "", rating: -1});
          }, 2000);
        }
      );
    }
  },

  getPriceRangeString: function () {
    var num = this.state.restaurant.price_range;
    var priceRange = "";
    for(var i = 0; i < num; i++) {
      priceRange += "$";
    }
    return priceRange;
  },

  handleRating: function (rating) {
    this.setState({
      rating: rating,
      ratingSet: true
    });
  },

  updateFlash: function () {
    this.setState({flash: "Updated!"});
    window.setTimeout(function () {
      this.setState({flash: ""});
    }.bind(this), 3000);
  },

  getOtherReviews: function () {
    var otherReviews = [];
    var reviews = this.state.restaurant.reviews;
    var CurrentUser = CurrentUserStore.currentUser();

    for (var i = 0; i < reviews.length; i++) {
      var review = reviews[i];
      if (review.author.id !== CurrentUser.id) {
        otherReviews.push(review);
      }
      if (otherReviews.length === 3) {
        break;
      }
    }

    return otherReviews;
  },

  render: function () {
    if (!this.state.loaded) {
      return (
        <div className="review-form new-review">
        </div>
      );
    }

    var restaurant = this.state.restaurant;
    var Link = ReactRouter.Link;

    var counterKlass = this.state.body.length > 300 ? "over" : "";

    return (
      <div className="review-form new-review group">
        <h1>{this.isUpdate ? "Update Your Review" : "Write a Review"}</h1>
        <div className="new-review-left group">
          <div className="restaurant-info-mini-container">
            <img src={restaurant.photo_url}/>
            <Link to={"/restaurants/" + restaurant.id}>{restaurant.name}</Link>
            <p>{this.getPriceRangeString()}</p>
            <p className="address">{restaurant.address}</p>
          </div>

          <form className="review-form group" onSubmit={this.handleSubmit}>


            <div className="review-form-body">
              {this.state.flash ? <p className="review-updated">{this.state.flash}</p> : null}

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
                isUpdate={this.isUpdate}
                posted={this.state.posted}
              />

              <div
                className={"review-form-length-counter " + counterKlass}>
                {this.state.body.length}/300
              </div>
            </div>
          </form>
          {this.isUpdate ? <DeleteReviewButton review={this.review}/> : null}
        </div>
        <div className="new-review-right group">
          <h3>See What Others Have Written</h3>
          <ReviewIndex reviews={this.getOtherReviews()}/>
        </div>
      </div>
    );
  }
});

module.exports = ReviewForm;
