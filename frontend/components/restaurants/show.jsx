var React = require('react');
var RestaurantApiUtil = require('../../util/restaurant_api_util');
var RestaurantStore = require('../../stores/restaurant_store');

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

  render: function () {
    if (!this.state.loaded) {
      return (
        <div>
          ...........LOADING..........
        </div>
      );
    }

    var restaurant = this.state.restaurant;
    return (
      <div className="restaurant-show group">
        <h1>{restaurant.name}</h1>
        <img className="stars" src={this.getStars()} />
        <p>
          {restaurant.reviews.length + " "}
          {restaurant.reviews.length == 1 ? "review" : "reviews"}
        </p>
        <p className="dollar-signs">{this.getPriceRangeString()}</p>
        <img className="static-map" src={this.getMap()} />
        <img className="restaurant-profile-photo" src={restaurant.photo_url} />
        <p className="address">{restaurant.address}</p>

      </div>
    );
  }
});

module.exports = RestaurantShow;
