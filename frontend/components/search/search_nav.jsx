var React = require('react');
var PriceFilter = require('./price_filter');
var FortuneCookieApiUtil = require('../../util/fortune_cookie_api_util');
var FortuneCookieStore = require('../../stores/fortune_cookie_store');
var FortuneCookie = require('./fortune_cookie');
var SortToggleIndex = require('./sort_toggle_index');

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
          {this.state.loaded ? <FortuneCookie cookie={this.state.cookie}/> : null}
          <div className="search-nav-header-container group">
            <h3>Price Filter</h3>
            <h3>Sort Results</h3>
          </div>
          <PriceFilter/>
          <SortToggleIndex/>
        </section>
      </nav>
    );
  }
});

module.exports = SearchNav;
