var React = require('react');
var ReactRouter = require('react-router');
var ReviewForm = require('../forms/review_form');
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
    var Link = ReactRouter.Link;

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
          <li className="group" key={index}>
            <img className="search-result-thumb" src={result.photo_url}/>
            <Link to={"/restaurants/" + result.id}>{result.name}</Link>
            <img className="stars" src={getStarsUrl(result.mean_rating)} />
            <p>{result.address}</p>
            <p>{getPriceRangeString(result.price_range)}</p>
            <Link to={"/restaurants/" + result.id + "/review"} className="new-review-button">Write a Review</Link>
          </li>
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
          placeholder="..."
          onKeyUp={this.search}
        />
        <ul className="review-search-results">
          {resultsToRender}
        </ul>
      </div>
    );
  }
});

function getPriceRangeString (num) {
  var priceRange = "";
  for(var i = 0; i < num; i++) {
    priceRange += "$";
  }
  return priceRange;
}

function getStarsUrl (num) {
  return window.PizzaTime.imageUrls.stars[num - 1];
}

module.exports = ReviewSearch;
