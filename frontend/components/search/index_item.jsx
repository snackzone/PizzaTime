var React = require('react');
var RestaurantActions = require('../../actions/restaurant_actions');
var RestaurantStore = require('../../stores/restaurant_store');

var IndexItem = React.createClass({
  render: function () {
    var klass = "search-index-item group";
    if (this.props.restaurant.focused) {
      klass += " focused";
    }
    var restaurant = this.props.restaurant;

    var labelContent = (RestaurantStore.findIndexById(restaurant.id) + 1).toString();
    return(
      <li className={klass}
          id={restaurant.id}
          onMouseOver={RestaurantActions.focusRestaurant}
          onMouseLeave={RestaurantActions.unfocusAllRestaurants}>
        <img src={restaurant.photo_url}
             className="restaurant-thumb"/>
        <p>{labelContent}: {restaurant.name}</p>
      </li>
    );
  }
});

module.exports = IndexItem;
