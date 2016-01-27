var React = require('react');
var IndexItem = require('./index_item');

var Index = React.createClass({
  render: function () {
    var restaurants = this.props.restaurants.map(function(restaurant, index) {
      return (
        <IndexItem
        className="search-index-item"
        restaurant={restaurant}
        key={index}
        />
      );
    });

    return (
      <ol className="search-index">
        {restaurants}
      </ol>
    );
  }
});

module.exports = Index;
