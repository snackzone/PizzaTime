var React = require('react');
var ReviewForm = require('../forms/review_form');
var ReviewSearchResult = require('./review_search_result');
var SearchApiUtil = require('../../util/search_api_util');
var SearchActions = require('../../actions/search_actions');
var SearchResultStore = require('../../stores/search_result_store');

var ReviewSearch = React.createClass({
  getInitialState: function () {
    return ({
      query: "",
      results: [],
      loaded: true,
      searched: false
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
      results: SearchResultStore.all(),
      loaded: true
    });
  },

  search: function (e) {
    var query = e.target.value;
    SearchApiUtil.search(query);

    var loaded = this.state.results.length > 0;
    var searched = (query.length !== 0);
    this.setState({
      query: query,
      loaded: loaded,
      searched: searched,
    });
  },

  render: function () {

    var resultsToRender = [];
    if (!this.state.loaded) {

      resultsToRender.push(<div key={1} className="review-search-loading">loading...</div>);

    } else {

      var allResults = this.state.results;

      for (var i = 0; i < allResults.length; i++) {
        var result = allResults[i];
        if (result._type !== "Restaurant") {
          break;
        }
        resultsToRender.push(result);
      }

      resultsToRender = resultsToRender.map(function(result, index) {
        return (
          <ReviewSearchResult key={index} result={result}/>
        );
      });

      if (resultsToRender.length === 0 && this.state.searched) {
        resultsToRender.push(<div key={1} className="review-search-no-results">No results!</div>);
      }
    }

    return (
      <div className="new-review">
        <h1>Search For Restaurants</h1>
        <input
          type="text"
          className="review-search-bar"
          placeholder="Let's get reviewing..."
          onKeyUp={this.search}
        />
        <ul className="review-search-results">
          {resultsToRender}
        </ul>
      </div>
    );
  }
});

module.exports = ReviewSearch;
