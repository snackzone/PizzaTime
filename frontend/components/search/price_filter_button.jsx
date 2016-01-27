var React = require('react');

var PriceFilterButton = React.createClass({
  render: function () {
    var dollarSigns = "";
    for (i = 0; i < this.props.num; i++) {
      dollarSigns += "$";
    }

    return (
      <button className="price-filter-button">
        {dollarSigns}
      </button>
    );
  }
});

module.exports = PriceFilterButton;
