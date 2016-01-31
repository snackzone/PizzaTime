var React = require('react');

var ReviewIndexItem = React.createClass({
  render: function () {
    return (
      <li>
        <h2>{this.props.restaurant_name}</h2>
        <h3>{this.props.created_at}</h3>
      </li>
    );
  }
});

module.exports = ReviewIndexItem;
