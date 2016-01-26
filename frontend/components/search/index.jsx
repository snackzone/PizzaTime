var React = require('react');
var IndexItem = require('./index_item');

var Index = React.createClass({
  render: function () {
    var restaurants = this.props.restaurants.map(function(restaurant) {
      <IndexItem
        className="search-index-item"
        restaurant={restaurant}
      />;
    });

    return (
      <div className="search-index">
        I'm the index.
        {restaurants}
      </div>
    );
  }
});

module.exports = Index;
