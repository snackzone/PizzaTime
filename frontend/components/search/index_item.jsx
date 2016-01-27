var React = require('react');
var RestaurantActions = require('../../actions/restaurant_actions');
var RestaurantStore = require('../../stores/restaurant_store');

var IndexItem = React.createClass({
  render: function () {
    var restaurant = this.props.restaurant;
    var klass = "search-index-item group";
    if (restaurant.focused) {
      klass += " focused";
    }

    var priceRangeString = getPriceRangeString(restaurant.price_range);

    var labelContent = (RestaurantStore.findIndexById(restaurant.id) + 1).toString();
    return(
      <li className={klass}
          id={restaurant.id}
          onMouseOver={RestaurantActions.focusRestaurant}
          onMouseLeave={RestaurantActions.unfocusAllRestaurants}>
        <img src={restaurant.photo_url}
             className="restaurant-thumb"/>
          <article>
             <p>
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
