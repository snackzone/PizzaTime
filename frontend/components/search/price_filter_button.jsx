var React = require('react');
var FilterActions = require('../../actions/filter_actions');

var PriceFilterButton = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    FilterActions.receiveFilter({max_price: this.props.num});
  },

  render: function () {
    var dollarSigns = "";
    for (i = 0; i < this.props.num; i++) {
      dollarSigns += "$";
    }

    return (
      <div className="price-filter-button-container" title={this.props.title}>
        <a href="#" className="price-filter-button"
                onClick={this.handleClick}>
          {dollarSigns}
        </a>
      </div>
    );
  }
});

module.exports = PriceFilterButton;
