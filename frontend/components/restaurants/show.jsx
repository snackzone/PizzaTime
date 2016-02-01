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
      size: "280x140",
      markers: [lat, lng].join(",")
    });

    return url + queryString;
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
      <div className="restaurant-show">
        <h1>{restaurant.name}</h1>
        <p>
          {restaurant.address}
        </p>
        <img src={restaurant.photo_url} />
        <img className="static-map" src={this.getMap()} />

      </div>
    );
  }
});

module.exports = RestaurantShow;
