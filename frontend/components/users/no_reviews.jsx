var React = require('react');

var NoReviews = React.createClass({
  render: function () {
    return (
      <div className="no-reviews">
        <p>
          Looks like you haven't reviewed any slices yet!
          What are you waiting for?
        </p>
        <a href="#" className="big-red-button review-button">Write a Review</a>
      </div>
    );
  }
});

module.exports = NoReviews;
