var History = require('react-router').History;
var React = require('react');
var ReviewApiUtil = require('../../util/review_api_util');

var DeleteReviewButton = React.createClass({
  getInitialState: function () {
    return ({confirm: false});
  },

  mixins: [History],

  handleClick: function (e) {
    e.preventDefault();
    if (this.state.confirm) {
      ReviewApiUtil.deleteReview(this.props.review, function(){
        this.history.pushState({}, "restaurants/" + this.props.review.restaurant.id);
      }.bind(this));
    } else {
      this.setState({confirm: true});
    }
  },

  render: function () {
    return (
      <a
        className="delete-review-button"
        href="#"
        onClick={this.handleClick}>
        {this.state.confirm ? "Are you sure?" : "Delete Review"}
      </a>
    );
  }
});

module.exports = DeleteReviewButton;
