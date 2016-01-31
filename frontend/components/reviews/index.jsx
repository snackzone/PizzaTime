var React = require('react');
var ReviewIndexItem = require('./index_item');
var ReviewApiUtil = require('../../util/review_api_util');
var ReviewStore = require('../../stores/review_store');

var ReviewIndex = React.createClass({
  getInitialState: function () {
    return {reviews: ReviewApiUtil.fetchReviewsForUser(this.props.user.id)};
  },

  componentDidMount: function () {
    this.reviewListener = ReviewStore.addListener(this._change);
  },

  _change: function () {
    this.setState({reviews: ReviewStore.findReviewsByUserId(this.props.user.id)});
  },

  render: function () {
    var reviews;

    if (this.state.reviews) {
      reviews = this.state.reviews.map(function(review, index) {
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
