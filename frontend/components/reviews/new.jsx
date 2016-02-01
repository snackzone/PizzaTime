var React = require('react');
var ReviewForm = require('../forms/review_form');
var SearchApiUtil = require('../../util/search_api_util');
var SearchResultStore = require('../../stores/search_result_store');
var ReactRouter = require('react-router');

var NewReview = React.createClass({
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
    this.forceUpdate();
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
          <h2>
            {result.name}
          </h2>
          <p>
            {result.address}
          </p>
          <a href="#" className="new-review-button">Write a Review</a>
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

module.exports = NewReview;
