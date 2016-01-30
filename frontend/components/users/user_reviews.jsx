var React = require('react');
var ReviewIndex = require('../reviews/index');

var UserReviews = React.createClass({


  render: function () {
    return (
      <div>
        REVIEWS.
        <ReviewIndex/>
      </div>
    );
  }
});

module.exports = UserReviews;
