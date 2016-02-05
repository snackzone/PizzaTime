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
    return (
      <div onClick={this.handleClick}>Click me.</div>
    );
  }
});

module.exports = PriceSortToggle;
