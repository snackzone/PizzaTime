var React = require('react');
var ReactRouter = require('react-router');
var ReviewForm = require('../forms/review_form');
var SearchApiUtil = require('../../util/search_api_util');
var SearchActions = require('../../actions/search_actions');
var SearchResultStore = require('../../stores/search_result_store');

var ReviewSearch = React.createClass({
  getInitialState: function () {
    return { query: "" };
  },

  componentDidMount: function () {
    this.searchResultListener = SearchResultStore.addListener(this._change);
  },

  componentWillUnmount: function () {
    this.searchResultListener.remove();
  },

  _change: function () {
    this.setState({query: query});
  },

  search: function (e) {
    var query = e.target.value;
    SearchApiUtil.search(query);
    this.setState({query: query});
  },

  render: function () {
    var Link = ReactRouter.Link;
    var results = [];

    for (var i = 0; i < SearchResultStore.all().length; i++) {
      var result = SearchResultStore.all()[i];
      if (result._type !== "Restaurant") {
        break;
      }
      results.push(result);
    }

    results = results.map(function(result, index) {
      return (
        <li className="group" key={index}>
          <img className="search-result-thumb" src={result.photo_url}/>
          <Link to={"/restaurants/" + result.id}>
            {result.name}
          </Link>
          <p>
            {result.address}
          </p>
          <Link to={"/restaurants/" + result.id + "/review"} className="new-review-button">Write a Review</Link>
        </li>
      );
    });

    return (
      <div className="new-review">
        <h1>Search For Restaurants</h1>
        <input
          type="text"
          className="review-search-bar"
          placeholder="..."
          onKeyUp={this.search}
        />
        <ul className="review-search-results">
          {results}
        </ul>
      </div>
    );
  }
});

module.exports = ReviewSearch;
