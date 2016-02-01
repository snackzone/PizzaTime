var React = require('react');
var RestaurantReview = require('./restaurant_review');

var RestaurantReviewIndex = React.createClass({
  render: function () {
    var reviews = this.props.reviews;
    reviews = reviews.map(function(review, index) {
      return <RestaurantReview review={review} key={index}/>;
    });

    return (
      <ul className="review-list">
        {reviews}
      </ul>
    );
  }
});

module.exports = RestaurantReviewIndex;
