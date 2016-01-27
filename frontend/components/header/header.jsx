var React = require('react');

var Header = React.createClass({
  render: function () {
    return (
      <header>
        <nav className="header-nav">
          <a href="#" className="logo">PizzaTime.</a>
        </nav>
      </header>
    );
  }
});

module.exports = Header;
