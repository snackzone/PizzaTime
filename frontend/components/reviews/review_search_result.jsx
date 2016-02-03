var CurrentUserStore = require('../../stores/current_user_store');
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var ReviewSearchResult = React.createClass({
  newReviewLink: function () {
    return (
      <Link
        to={"/restaurants/" + this.props.result.id + "/review"}
        className="new review-button">
        Write a Review
      </Link>
    );
  },

  updateReviewLink: function () {
    return (
      <Link
        to={"/restaurants/" + this.props.result.id + "/review"}
        className="update review-button">
        Write an Update
      </Link>
    );
  },

  render: function () {
    var restaurant = this.props.result;
    var hasReviewed = CurrentUserStore.findReview(restaurant.id);
    var reviewLink = hasReviewed ? this.updateReviewLink() : this.newReviewLink();

    return(
      <li className="group">
        <img className="search-result-thumb" src={restaurant.photo_url}/>
        <Link to={"/restaurants/" + restaurant.id}>{restaurant.name}</Link>
        <img className="stars" src={getStarsUrl(restaurant.mean_rating)} />
        <p>{restaurant.address}</p>
        <p>{getPriceRangeString(restaurant.price_range)}</p>
        {reviewLink}
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
