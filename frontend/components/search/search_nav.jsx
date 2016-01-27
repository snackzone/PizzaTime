var React = require('react');
var PriceFilter = require('./price_filter');

var SearchNav = React.createClass({
  render: function () {
    return (
      <nav className="search-nav">
        <section className="search-nav-section">
          <h2>Search Results</h2>
          <h3>Filters</h3>
          <PriceFilter/>
        </section>
      </nav>
    );
  }
});

module.exports = SearchNav;
