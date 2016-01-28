var React = require('react');

var LoginLogout = React.createClass({
  render: function () {
    var display;
    if (window.PizzaTime.currentUserId) {
      display = <h1>You are logged in.</h1>;
    } else {
      display = <h1>You are not logged in.</h1>;
    }
    return (
      <div>

        {display}
      </div>
    );
  }
});


module.exports = LoginLogout;
