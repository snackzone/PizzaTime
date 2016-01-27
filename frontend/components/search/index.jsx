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

    if (restaurants.length === 0) {
      restaurants = <h3 className="no-results">No results!</h3>;
    }

    return (
      <ul className="search-index">
        {restaurants}
      </ul>
    );
  }
});

module.exports = Index;
