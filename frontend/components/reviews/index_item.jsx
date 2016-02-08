var React = require('react');
var ReactRouter = require('react-router');
var ReviewButton = require('./review_button');


var ReviewIndexItem = React.createClass({
  render: function () {
    var Link = ReactRouter.Link;
    var review = this.props.review;
    var restaurant = this.props.review.restaurant;
    var starsUrl = getStarsUrl(review.rating);
    var priceRange = getPriceRangeString(restaurant.price_range);

    return (
      <li className="review-li group">
        <img className="review-thumb" src={restaurant.photo_url}/>
        <div className="review-restaurant-info">
          <Link to={"/restaurants/" + restaurant.id}>
            {restaurant.name}
          </Link>
          <p>{priceRange}</p>
          <p>{restaurant.address}</p>
        </div>

        {this.props.isCurrentUser ?
          <div className="update-review-button-container">
          <ReviewButton isUpdate={true} restaurant={restaurant}/>
          </div>
          : null}

        <div className="review-rating-container group">
          <img className="stars" src={starsUrl} />
          <p className="review-date">{review.date}</p>
        </div>


        <p className="review-body">{review.body}</p>
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

module.exports = ReviewIndexItem;
