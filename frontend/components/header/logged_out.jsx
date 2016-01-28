var React = require('react');

var LoggedOut = React.createClass({
  render: function () {
    return (
      <div className="logged-out">
        <h1>You are not logged in.</h1>
        <a href="/session/new">Sign in</a> or <a href="/users/new">Sign up.</a>
      </div>
    );
  }
});


module.exports = LoggedOut;
