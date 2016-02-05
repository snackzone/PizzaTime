var React = require('react');
var PriceFilter = require('./price_filter');
var FortuneCookieApiUtil = require('../../util/fortune_cookie_api_util');
var FortuneCookieStore = require('../../stores/fortune_cookie_store');
var FortuneCookie = require('./fortune_cookie');
var SortToggles = require('./sort_toggles');

var SearchNav = React.createClass({
  getInitialState: function () {
    return({
      cookie: null,
      loaded: false
    });
  },

  componentWillMount: function () {
    FortuneCookieApiUtil.fetchCookie(this.change);
  },

  componentDidMount: function () {
    this.cookieListener = FortuneCookieStore.addListener(this.change);
  },

  componentWillUnmount: function () {
    this.cookieListener.remove();
  },

  change: function () {
    this.setState({
      cookie: FortuneCookieStore.fortuneCookie(),
      loaded: true
    });
  },

  render: function () {
    return (
      <nav className="search-nav">
        <section className="search-nav-section group">
          <h2>Search Results</h2>
          {this.state.loaded ? <FortuneCookie cookie={this.state.cookie}/> : null}
          <h3>Filters</h3>
          <PriceFilter/>
          <SortToggles/>
        </section>
      </nav>
    );
  }
});

module.exports = SearchNav;
