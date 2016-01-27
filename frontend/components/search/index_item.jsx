var React = require('react');
var RestaurantActions = require('../../actions/restaurant_actions');
var RestaurantStore = require('../../stores/restaurant_store');

var IndexItem = React.createClass({
  render: function () {
    var restaurant = this.props.restaurant;
    var klass = "";
    if (restaurant.focused) {
      klass += "focused";
    }

    var priceRangeString = getPriceRangeString(restaurant.price_range);

    var labelContent = (RestaurantStore.findIndexById(restaurant.id) + 1).toString();
    return(
      <li className="search-index-item group"
          id={restaurant.id}
          onMouseOver={RestaurantActions.focusRestaurant}
          onMouseLeave={RestaurantActions.unfocusAllRestaurants}>
        <img src={restaurant.photo_url}
             className="restaurant-thumb"/>
          <article>
             <p className={klass}>
               {labelContent}: {restaurant.name}
             </p>
             <a href={restaurant.url}
                className="search-index-item-link">
                website
             </a>
             <p>{priceRangeString}</p>
          </article>
      </li>
    );
  }
});


var getPriceRangeString = function (num) {
  var priceRange = "";
  for(var i = 0; i < num; i++) {
    priceRange += "$";
  }
  return priceRange;
};

module.exports = IndexItem;
