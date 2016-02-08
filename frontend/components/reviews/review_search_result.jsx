var CurrentUserStore = require('../../stores/current_user_store');
var React = require('react');
var ReactRouter = require('react-router');
var ReviewButton = require('./review_button');

var ReviewSearchResult = React.createClass({
  render: function () {
    var restaurant = this.props.result;

    var idx = restaurant.address.indexOf(",");
    var lineOne = restaurant.address.slice(0, idx + 1);
    var lineTwo = restaurant.address.slice(idx + 2);

    var hasReviewed = CurrentUserStore.findReview(restaurant.id);
    var Link = ReactRouter.Link;

    return(
      <li className="search-result group">
        <img className="search-result-thumb" src={restaurant.photo_url}/>
        <Link to={"/restaurants/" + restaurant.id}>{restaurant.name}</Link>
        <img className="stars" src={getStarsUrl(restaurant.mean_rating)} />
        <p>{lineOne}</p>
        <p>{lineTwo}</p>
        <p>{getPriceRangeString(restaurant.price_range)}</p>
        <ReviewButton
          restaurant={restaurant}
          isUpdate={hasReviewed}/>
      </li>
    );
  }
});

function getPriceRangeString (num) {
  var priceRange = "";
  for(var i = 0; i < num; i++) {
    priceRange += "$";
  }
  return priceRange;
}

function getStarsUrl (num) {
  return window.PizzaTime.imageUrls.stars[num - 1];
}

module.exports = ReviewSearchResult;
