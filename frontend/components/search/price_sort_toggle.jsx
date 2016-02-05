var React = require('react');
var FilterActions = require('../../actions/filter_actions');

var SortToggle = React.createClass({
  getInitialState: function () {
    return ({
      active: false,
      ascending: false,
      clickCount: 0
    });
  },

  handleClick: function (e) {
    e.preventDefault();
    var field, filter;
    if (this.state.clickCount === 2) {
      field = this.props.sortField;
      filter = {};
      filter[field] = { ascending: "none"};
      FilterActions.receiveFilter(filter);

      this.setState({
        active: false,
        ascending: false,
        clickCount: 0
      });
      return;
    }

    field = this.props.sortField;
    filter = {};
    filter[field] = { ascending: !this.state.ascending};
    FilterActions.receiveFilter(filter);

    this.setState({
      active: true,
      ascending: !this.state.ascending,
      clickCount: this.state.clickCount + 1
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
