var React = require('react');
var SearchApiUtil = require('../../util/search_api_util');
var SearchActions = require('../../actions/search_actions');
var SearchResultStore = require('../../stores/search_result_store');
var HeaderSearchResult = require('./header_search_result');
var ClickOutside = require('react-onclickoutside');

var HeaderSearchBar = React.createClass({
  mixins: [ClickOutside],

  getInitialState: function () {
    return ({
      query: "",
      results: [],
    });
  },

  componentDidMount: function () {
    this.searchResultListener = SearchResultStore.addListener(this._change);
  },

  componentWillUnmount: function () {
    this.searchResultListener.remove();
  },

  _change: function () {
    this.setState({
      results: SearchResultStore.all()
    });
  },

  search: function (e) {
    var query = e.target.value;
    SearchApiUtil.search(query);

    this.setState({
      query: query
    });
  },

  handleClickOutside: function () {
    this.clearSearch();
  },

  clearSearch: function () {
    // debugger
    SearchActions.clearSearchResults();
    this.setState({
      query: ""
    });
  },

  render: function () {
    var results;
    if (this.state.results.length > 0) {
      var that = this;
      results = this.state.results.map(function(result, index) {
        return (
          <HeaderSearchResult
            name={result.name}
            id={result.id}
            key={index}
          />
        );
      });
    }

    return(
      <div className="header-search-bar">

        <div className="input-container group">
          <h2 className="find">Find</h2>
          <input
            className="header-search-input"
            type="text"
            placeholder="pizza, pizza, pizza"
            onKeyUp={this.search}
          />
          { results ?
          <ul
            className="header-search-results"
            onClick={this.clearSearch}>
            {results}
          </ul>
            : null }
        </div>

      </div>
    );
  }
});

module.exports = HeaderSearchBar;
