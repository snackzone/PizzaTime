var React = require('react');
var PriceFilterButton = require('./price_filter_button');
var pricePoints = [
  "inexpensive",
  "moderate",
  "pricey",
  "mama mia!"
];

var PriceFilter = React.createClass({
  render: function () {
    var buttons = pricePoints.map(function(string, idx) {
      return <PriceFilterButton num={idx + 1} title={string} key={idx}/>;
    });

    return(
      <div className="price-filter">
        {buttons}
      </div>
    );
  }
});

module.exports = PriceFilter;
