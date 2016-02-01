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
      </div>
    );
  }
});

module.exports = RestaurantShow;
