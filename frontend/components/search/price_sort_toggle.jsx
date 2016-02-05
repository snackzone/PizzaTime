var React = require('react');
var FilterActions = require('../../actions/filter_actions');

var PriceSortToggle = React.createClass({
  getInitialState: function () {
    return ({
      active: false,
      ascending: false
    });
  },

  handleClick: function (e) {
    e.preventDefault();
    FilterActions.receiveFilter(
      {sort_price:
        { ascending: !this.state.ascending}
      }
    );

    this.setState({
      active: true,
      ascending: !this.state.ascending
    });
  },

  render: function () {
    var klass = this.state.active ?
      this.state.ascending ? "ascending" : "descending"
      : "inactive";

    return (
      <div className={"sort-toggle " + klass} onClick={this.handleClick}>Sort (price)</div>
    );
  }
});

module.exports = PriceSortToggle;
