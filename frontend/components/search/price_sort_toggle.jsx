var React = require('react');
var FilterActions = require('../../actions/filter_actions');

var SortToggle = React.createClass({
  getInitialState: function () {
    return ({
      active: false,
      ascending: false
    });
  },

  handleClick: function (e) {
    e.preventDefault();
    var field, filter;
    if (this.state.active && !this.state.ascending) {
      field = this.props.sortField;
      filter = {};
      filter[field] = { ascending: "none"};
      FilterActions.receiveFilter(filter);

      this.setState({
        active: false,
        ascending: !this.state.ascending
      });
      return;
    }

    field = this.props.sortField;
    filter = {};
    filter[field] = { ascending: !this.state.ascending};
    FilterActions.receiveFilter(filter);

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
      <div className={"sort-toggle " + klass} onClick={this.handleClick}>{this.props.name}</div>
    );
  }
});

module.exports = SortToggle;
