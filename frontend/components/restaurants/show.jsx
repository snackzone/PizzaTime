var React = require('react');
var RestaurantApiUtil = require('../../util/restaurant_api_util');
var RestaurantStore = require('../../stores/restaurant_store');
var RestaurantReviews = require('./restaurant_review_index');
var ReactRouter = require('react-router');
var CurrentUserStore = require('../../stores/current_user_store');


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

    var Link = ReactRouter.Link;
    var restaurant = this.state.restaurant;
    var idx = -1;
    for(var i = 0; i < restaurant.reviews.length; i++) {
      if (restaurant.reviews[i].author.id === CurrentUserStore.currentUser().id) {
        idx = i;
        break;
      }
    }

    var reviewLink;
    if (idx === -1) {
      reviewLink = <Link to={"/restaurants/" + restaurant.id + "/review"}
                         className="big-red-button">
                          Write a Review
                  </Link>;
    } else {
      reviewLink = <h2 className="restaurant-show-already-reviewed">
                    You reviewed {restaurant.name} on {restaurant.reviews[idx].date}
                  </h2>;
    }

    return (
      <div className="restaurant-show-container">
        <div className="restaurant-info-container">
          <div className="restaurant-show group">
            <h1>{restaurant.name}</h1>
            {reviewLink}
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
            <img className="restaurant-profile-photo" src={restaurant.photo_url} />
          </div>
        </div>
        <div className="restaurant-review-container">
          <RestaurantReviews reviews={restaurant.reviews}/>
        </div>
      </div>
    );
  }
});

module.exports = RestaurantShow;
