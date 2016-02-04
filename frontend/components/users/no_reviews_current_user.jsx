var React = require('react');
var ReactRouter = require('react-router');


var NoReviewsCurrentUser = React.createClass({
  render: function () {
    var Link = ReactRouter.Link;
    return (
      <div className="no-reviews">
        <p>
          Looks like you haven't reviewed any slices yet!
          What are you waiting for?
        </p>
        <Link to="/reviews/search" className="big-red-button">Write a Review</Link>
      </div>
    );
  }
});

module.exports = NoReviewsCurrentUser;
