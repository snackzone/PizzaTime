var React = require('react');
var PriceFilterButton = require('./price_filter_button');

var PriceFilter = React.createClass({
  render: function () {
    var buttons = [1, 2, 3, 4].map(function(num) {
      return <PriceFilterButton num={num} key={num}/>;
    });

    return(
      <div className="price-filter-button-container">
        {buttons}
      </div>
    );
  }
});

module.exports = PriceFilter;
