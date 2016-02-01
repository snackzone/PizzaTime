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
    if (SearchResultStore.all().length > 0) {
      debugger
    }

    return (
      <div className="new-review">
        <input type="text" placeholder="search for restaurants" onKeyUp={ this.search } />

        <ReviewForm/>
      </div>
    );
  }
});

module.exports = NewReview;
