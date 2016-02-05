var React = require('react');
var FilterActions = require('../../actions/filter_actions');

var PriceFilterButton = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    this.props.handleClick(this.props.id, this.props.maxPrice);
    if (this.props.maxPrice) {
      FilterActions.receiveFilter({max_price: 5});
    } else {
      FilterActions.receiveFilter({max_price: this.props.num});
    }
  },

  render: function () {
    var dollarSigns = "";
    for (i = 0; i < this.props.num; i++) {
      dollarSigns += "$";
    }

    var active = this.props.active ? "active" : "inactive";

    return (
      <div className="price-filter-button-container" title={this.props.title}>
        <a href="#" className={"price-filter-button " + active}
                onClick={this.handleClick}>
          {dollarSigns}
        </a>
      </div>
    );
  }
});

module.exports = PriceFilterButton;
