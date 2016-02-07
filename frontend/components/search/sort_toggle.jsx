var React = require('react');
var FilterActions = require('../../actions/filter_actions');

var SortToggle = React.createClass({
  // getInitialState: function () {
  //   return ({
  //     active: false,
  //     ascending: false,
  //     clickCount: 0
  //   });
  // },

  handleClick: function (e) {
    e.preventDefault();
    this.props.toggleFilter(parseInt(e.currentTarget.id));
  },

  render: function () {
    var klass = this.props.active ?
      this.props.ascending ? "ascending" : "descending"
      : "inactive";

    return (
      <div
        id={this.props.id}
        name={this.props.name }
        className={"sort-toggle " + klass}
        onClick={this.handleClick}>
        {this.props.name}
      </div>
    );
  }
});

module.exports = SortToggle;
