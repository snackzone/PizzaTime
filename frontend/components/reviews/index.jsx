var React = require('react');
var ReviewIndexItem = require('./index_item');
var ReviewApiUtil = require('../../util/review_api_util');
var ReviewStore = require('../../stores/review_store');

var ReviewIndex = React.createClass({
  render: function () {
    var reviews;
    var user = this.props.user;
    if (user.reviews) {
      reviews = user.reviews.map(function(review, index) {
        return <ReviewIndexItem review={review} key={index}/>;
      });
    }

    return (
      <ul>
        {reviews}
      </ul>
    );
  }
});

module.exports = ReviewIndex;
