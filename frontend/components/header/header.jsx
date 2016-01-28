var React = require('react');
var LoginLogout = require('./login_logout');

var Header = React.createClass({
  render: function () {
    return (
      <header>
        <nav className="header-nav group">
          <a href="#" className="logo">PizzaTime.</a>
          <LoginLogout/>
        </nav>
      </header>
    );
  }
});

module.exports = Header;
