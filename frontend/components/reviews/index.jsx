var React = require('react');
var ReviewIndexItem = require('./index_item');

var ReviewIndex = React.createClass({

  render: function () {
    return (
      <ul>
        <ReviewIndexItem/>
      </ul>
    );
  }
});

module.exports = ReviewIndex;
