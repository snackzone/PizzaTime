var React = require('react');

var NoReviewsUser = React.createClass({
  render: function () {
    return (
      <div className="no-reviews">
        <p>
          This user hasn't posted any reviews yet!
        </p>
      </div>
    );
  }
});

module.exports = NoReviewsUser;
