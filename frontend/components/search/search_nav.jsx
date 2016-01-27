var React = require('react');

var SearchNav = React.createClass({
  render: function () {
    return (
      <nav className="search-nav">
        <section className="search-nav-section">
          <h2>Search Results</h2>
        </section>
      </nav>
    );
  }
});

module.exports = SearchNav;
