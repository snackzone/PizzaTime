var React = require('react');
var RestaurantApiUtil = require('../../util/restaurant_api_util');
var RestaurantStore = require('../../stores/restaurant_store');
var RestaurantReviews = require('./restaurant_review_index');
var ReactRouter = require('react-router');
var CurrentUserStore = require('../../stores/current_user_store');
var ReviewButton = require('../reviews/review_button');
var RestaurantPhotoButton = require('./restaurant_photo_button');
var ReviewMiniForm = require('../forms/review_mini_form');
var SessionApiUtil = require('../../util/session_api_util');
var RestaurantPhotos = require('./restaurant_photos');


var RestaurantShow = React.createClass({
  getInitialState: function () {
    return ({
      restaurant: RestaurantApiUtil.fetchRestaurant(this.props.params.id, this.change),
      loaded: false
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
      loaded: false
    });
  },

  change: function () {
    this.setState({
      restaurant: RestaurantStore.findById(this.props.params.id),
      loaded: true
    });
  },

  getMap: function () {
    var lat, lng;
    lat = this.state.restaurant.lat;
    lng = this.state.restaurant.lng;
    var url = "https://maps.googleapis.com/maps/api/staticmap?";
    var queryString = $.param({
      center: [lat, lng].join(","),
      zoom: 15,
      size: "280x280",
      markers: [lat, lng].join(",")
    });

    return url + queryString;
  },

  getStars: function () {
    var rating = this.state.restaurant.mean_rating;
    return window.PizzaTime.imageUrls.stars[rating - 1];
  },

  getPriceRangeString: function () {
    var num = this.state.restaurant.price_range;
    var priceRange = "";
    for(var i = 0; i < num; i++) {
      priceRange += "$";
    }
    return priceRange;
  },

  getMiniForm: function (isUpdate) {
    if (CurrentUserStore.isLoggedIn() && !isUpdate) {
      return (
        <ReviewMiniForm
          restaurantId={this.state.restaurant.id}
          isUpdate={isUpdate}
          successCB={this._handleSubmit}
        />
      );
    }
  },

  _handleSubmit: function () {
    SessionApiUtil.fetchCurrentUser();

    this.setState({
      restaurant: RestaurantApiUtil.fetchRestaurant(this.props.params.id, this.change),
      loaded: false
    });
  },

  render: function () {
    if (!this.state.loaded) {
      return (
        <div className="restaurant-show-container">
          ...........LOADING..........
        </div>
      );
    }

    var Link = ReactRouter.Link;
    var restaurant = this.state.restaurant;
    var isUpdate = !!CurrentUserStore.findReview(restaurant.id);

    return (
      <div className="restaurant-show-container">
        <div className="restaurant-info-container">
          <div className="restaurant-show group">
            <h1>{restaurant.name}</h1>

            <ReviewButton
              isUpdate={isUpdate}
              restaurant={restaurant.id}/>

            <div className="info-container group">
              <img className="stars" src={this.getStars()} />
              <p>
                {restaurant.reviews.length + " "}
                {restaurant.reviews.length == 1 ? "review" : "reviews"}
              </p>
              <p className="dollar-signs">{this.getPriceRangeString()}</p>
            </div>
            <div className="static-map-container group">
              <img className="static-map" src={this.getMap()} />
              <p className="address">{restaurant.address}</p>
            </div>
            <RestaurantPhotos
              profilePhoto={restaurant.photo_url}
              userUploads={restaurant.photos}
            />
            <RestaurantPhotoButton restaurant={restaurant}/>
          </div>
        </div>
        <div className="restaurant-review-container">
          {this.getMiniForm(isUpdate)}
          <RestaurantReviews reviews={restaurant.reviews}/>
        </div>
      </div>
    );
  }
});

module.exports = RestaurantShow;
