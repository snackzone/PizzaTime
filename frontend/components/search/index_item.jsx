var React = require('react');

var IndexItem = React.createClass({
  render: function () {
    return(
      <ul>
        <li>
          {this.props.restaurant.name}
        </li>
      </ul>
    );
  }
});

module.exports = IndexItem;
