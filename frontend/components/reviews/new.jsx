var React = require('react');
var ReviewForm = require('../forms/review_form');

var NewReview = React.createClass({
  render: function () {
    return (
      <div className="new-review">
        <ReviewForm/>
      </div>
    );
  }
});

module.exports = NewReview;
