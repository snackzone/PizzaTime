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


var ReviewForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return ({
      restaurant: RestaurantApiUtil.fetchRestaurant(this.props.params.id, this.change),
      loaded: false,
      body: "",
      rating: -1,
      ratingSet: false
    });
  },

  componentDidMount: function () {
    this.restaurantListener = RestaurantStore.addListener(this.change);
  },

  componentWillUnmount: function () {
    this.restaurantListener.remove();
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      restaurant: RestaurantApiUtil.fetchRestaurant(nextProps.params.id, this.change),
      loaded: false,
      reviewBody: "Write your review here!",
      rating: null
    });
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

    ReviewApiUtil.submitReview(
      review, function successCB (id) {
        this.history.pushState({}, "restaurants/" + id);
        SessionApiUtil.fetchCurrentUser();
      }.bind(this)
    );

    this.setState({body: "", rating: -1});
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

  render: function () {
    if (!this.state.loaded) {
      return (
        <div className="review-form new-review">
        </div>
      );
    }

    var disabled = (this.state.body.length < 20 ||
      this.state.body.length > 300 ||
      this.state.review < 1);

    var buttonClass = "big-red-button submit-button";
    if (disabled) {
      buttonClass += " disabled";
    }

    var restaurant = this.state.restaurant;
    var Link = ReactRouter.Link;
    return (
      <div className="review-form new-review group">
        <h1>Write a Review</h1>
        <div className="new-review-left group">
          <div className="restaurant-info-mini-container">
            <img src={restaurant.photo_url}/>
            <Link to={"/restaurants/" + restaurant.id}>{restaurant.name}</Link>
            <p>{this.getPriceRangeString()}</p>
            <p className="address">{restaurant.address}</p>
          </div>

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

              <button disabled={disabled} className={buttonClass}>Post Review</button>

            </div>

          </form>
        </div>
        <div className="new-review-right group">
          <h3>See What Others Have Written</h3>
          <ReviewIndex reviews={this.state.restaurant.reviews.slice(0, 3)}/>
        </div>
      </div>
    );
  }
});

module.exports = ReviewForm;
