var React = require('react');

var ReviewIndexItem = React.createClass({
  render: function () {
    return (
      <li>
        {this.props.review.body}
      </li>
    );
  }
});

module.exports = ReviewIndexItem;
