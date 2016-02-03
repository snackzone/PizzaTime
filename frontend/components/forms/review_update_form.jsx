var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');

var ReviewUpdateForm = React.createClass({
  getInitialState: function () {
    review = this.review = CurrentUserStore.findReview(this.props.params.id);
    if (review) {
      return (this.populatedState);
    } else {
      return ({
        body: "",
        rating: -1
      });
    }
  },

  populatedState: function () {
    var review = this.review;
    return ({
      body: review.body,
      rating: review.rating
    });
  },

  render: function () {
    debugger
    return (
      <div>
        UPDATE MEEEEEE
      </div>
    );
  }
});

module.exports = ReviewUpdateForm;
