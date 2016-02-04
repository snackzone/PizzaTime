var React = require('react');
var LoginLogout = require('./login_logout');
var HeaderSearchBar = require('./header_search_bar');

var Header = React.createClass({
  getInitialState: function () {
    return {locationHash: window.location.hash};
  },

  componentWillReceiveProps: function () {
    this.setState({locationHash: window.location.hash});
  },

  render: function () {
    var location = parseLocationHash(this.state.locationHash);
    var loginLogout, headerSearchBar;

    if (["/session/new", "/users/new"].indexOf(location) === -1) {
      loginLogout = <LoginLogout/>;
    }

    if (location !== "/reviews/search") {
      headerSearchBar = <HeaderSearchBar/>;
    }

    return (
      <header>
        <nav className="header-nav group">
          <a href="#" className="logo"><img src={window.PizzaTime.imageUrls.sprites.logo}/></a>
          {headerSearchBar}
          {loginLogout}
        </nav>
      </header>
    );
  }
});

function parseLocationHash (hash) {
  var re = /\/?#(.+)\?/;
  return hash.match(re)[1];
}

module.exports = Header;
