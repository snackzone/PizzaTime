var React = require('react');
var FilterActions = require('../../actions/filter_actions');

var PriceFilterButton = React.createClass({
  handleClick: function () {
    FilterActions.receiveFilter({max_price: this.props.num});
  },

  render: function () {
    var dollarSigns = "";
    for (i = 0; i < this.props.num; i++) {
      dollarSigns += "$";
    }

    return (
      <button className="price-filter-button"
              onClick={this.handleClick}>
        {dollarSigns}
      </button>
    );
  }
});

module.exports = PriceFilterButton;
