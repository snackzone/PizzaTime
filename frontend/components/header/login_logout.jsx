var React = require('react');
var LoggedIn = require('./logged_in');
var LoggedOut = require('./logged_out');

var LoginLogout = React.createClass({
  render: function () {

    var display = window.PizzaTime.currentUserId ? <LoggedIn/> : <LoggedOut/>;

    return (
      <div>
        {display}
      </div>
    );
  }
});


module.exports = LoginLogout;
