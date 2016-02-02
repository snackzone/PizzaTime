var React = require('react');
var ReactRouter = require('react-router');
var RestaurantActions = require('../../actions/restaurant_actions');
var RestaurantStore = require('../../stores/restaurant_store');

var IndexItem = React.createClass({
  getStars: function () {
    var rating = this.props.restaurant.mean_rating;
    return window.PizzaTime.imageUrls.stars[rating - 1];
  },

  render: function () {
    var restaurant = this.props.restaurant;
    var klass = "search-index-item group";
    if (restaurant.focused) {
      klass += " focused";
    }

    var priceRangeString = getPriceRangeString(restaurant.price_range);
    var Link = ReactRouter.Link;
    var num = (RestaurantStore.findIndexById(restaurant.id) + 1).toString();
    return(
      <li className={klass}
        id={restaurant.id}
        onMouseOver={RestaurantActions.focusRestaurant}
        onMouseLeave={RestaurantActions.unfocusAllRestaurants}>

        <Link to={"/restaurants/" + restaurant.id}>
          <img src={restaurant.photo_url}
            className="restaurant-thumb"/>
        </Link>


        <article className="search-index-item-info-container group">
          <div className="num">{num}: </div>
          <Link to={"/restaurants/" + restaurant.id}>
          {restaurant.name}
          </Link>
          <img className="stars" src={this.getStars()}/>
          <p>{restaurant.address}</p>
          <div>{priceRangeString}</div>
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
