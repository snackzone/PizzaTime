var React = require('react');
var RestaurantStore = require('../../stores/restaurant_store');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReviewApiUtil = require('../../util/review_api_util');
var RestaurantApiUtil = require('../../util/restaurant_api_util');
var CurrentUserStore = require('../../stores/current_user_store');
var FlashStore = require('../../stores/flash_store');
var FlashActions = require('../../actions/flash_actions');
var ReactRouter = require('react-router');
var History = require('react-router').History;



var ReviewForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return ({
      restaurant: RestaurantApiUtil.fetchRestaurant(this.props.params.id, this.change),
      loaded: false,
      body: "Write your review here!",
      rating: null,
      flash: []
    });
  },

  componentDidMount: function () {
    this.restaurantListener = RestaurantStore.addListener(this.change);
    this.flashListner = FlashStore.addListener(this._updateFlash);
  },

  componentWillUnmount: function () {
    this.restaurantListener.remove();
    this.flashListner.remove();
    FlashActions.receiveFlash([]);
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
      rating:         this.state.rating
    };

    ReviewApiUtil.submitReview(
      review, function successCB (id) {
        this.history.pushState({}, "restaurants/" + id);
      }.bind(this)
    );

    this.setState({body: "", rating: null});
  },

  getPriceRangeString: function () {
    var num = this.state.restaurant.price_range;
    var priceRange = "";
    for(var i = 0; i < num; i++) {
      priceRange += "$";
    }
    return priceRange;
  },

  _updateFlash: function () {
    this.setState({ flash: FlashStore.all() });
  },

  render: function () {
    if (!this.state.loaded) {
      return (
        <div>
          ..........LOADING..........
        </div>
      );
    }

    var errors;
    if (this.state.flash.length > 0) {
      var messages = this.state.flash.map(function(error, index) {
        return <li key={index}>{error}</li>;
      });
      errors = (
        <ul className="user-form-errors">
          {messages}
        </ul>
      );
    }

    var restaurant = this.state.restaurant;
    var Link = ReactRouter.Link;

    return (
      <div className="review-form new-review">
        <h1>Write a Review</h1>

        <div className="restaurant-info-mini-container">
          <img src={restaurant.photo_url}/>
          <Link to={"/restaurants/" + restaurant.id}>{restaurant.name}</Link>
          <p>{this.getPriceRangeString()}</p>
          <p>{restaurant.address}</p>
        </div>

        <form className="review-form group" onSubmit={this.handleSubmit}>
          <label htmlFor="rating">Rating</label>
          <select name="rating" valueLink={this.linkState('rating')}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <textarea
            valueLink={this.linkState('body')}
            defaultValue="Write your review here!">
          </textarea>

          <button className="big-red-button submit-button">Submit</button>
        </form>
        {errors}
      </div>
    );
  }
});

module.exports = ReviewForm;
