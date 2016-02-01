var React = require('react');
var ReviewForm = require('../forms/review_form');
var SearchApiUtil = require('../../util/search_api_util');
var SearchResultStore = require('../../stores/search_result_store');


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
    var results = [];
    for (var i = 0; i < SearchResultStore.all().length; i++) {
      var result = SearchResultStore.all()[i];
      if (result._type !== "Restaurant") {
        break;
      }
      results.push(result);
    }

    results = results.map(function(result, index) {
      return <li key={index}>{result.name}</li>;
    });

    return (
      <div className="new-review">
        <input type="text" placeholder="search for restaurants" onKeyUp={ this.search } />
        <ul>
          {results}
        </ul>
        <ReviewForm/>
      </div>
    );
  }
});

module.exports = NewReview;
