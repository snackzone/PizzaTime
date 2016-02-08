var React = require('react');
var SortToggle = require('./sort_toggle');
var FilterActions = require('../../actions/filter_actions');

var SortToggleIndex = React.createClass({
  getInitialState: function () {
    return ({
      toggles: [
        this.getNewSortToggle("sort_price", "Price", 0),
        this.getNewSortToggle("sort_rating", "Rating", 1)
      ]
    });
  },

  getNewSortToggle: function (fieldString, nameString, id) {
    return (
      <SortToggle
        sortField={fieldString}
        id={id}
        key={id}
        name={nameString}
        active={false}
        ascending={false}
        clickCount={0}
        toggleFilter={this.toggleFilter}/>
    );
  },

  getSortToggle: function (options) {
    return (
      <SortToggle
        id={options.id}
        key={options.id}
        name={options.name}
        active={options.active}
        ascending={options.ascending}
        sortField={options.sortField}
        clickCount={options.clickCount}
        toggleFilter={this.toggleFilter}/>
    );
  },

  getClickedToggleOptions: function (toggle) {
    return ({
      id: toggle.props.id,
      name: toggle.props.name,
      active: true,
      ascending: !toggle.props.ascending,
      sortField: toggle.props.sortField,
      clickCount: toggle.props.clickCount + 1
    });
  },

  toggleFilter: function (id) {
    var field, filter;

    var toggle = this.state.toggles[id];

    if (toggle.props.clickCount === 2) {
      field = toggle.props.sortField;
      filter = {};
      filter[field] = { ascending: "none"};
      FilterActions.receiveFilter(filter);

      this.setState({
        toggles: [
          this.getNewSortToggle("sort_price", "Price", 0),
          this.getNewSortToggle("sort_rating", "Rating", 1)
        ]
      });
      return;
    }

    field = toggle.props.sortField;
    filter = {};
    filter[field] = { ascending: !toggle.props.ascending};
    FilterActions.receiveFilter(filter);

    var toggleOptions = this.getClickedToggleOptions(toggle);

    var toggles = this.state.toggles;
    toggles[id] = this.getSortToggle(toggleOptions);

    var otherId = id === 0 ? 1 : 0;

    var otherToggle = this.state.toggles[otherId];

    toggles[otherId] = this.getNewSortToggle(
      otherToggle.props.sortField,
      otherToggle.props.name,
      otherId
    );

    this.setState({
      toggles: toggles
    });
  },

  render: function () {
    return (
      <div>
        {this.state.toggles}
      </div>
    );
  }
});

module.exports = SortToggleIndex;
