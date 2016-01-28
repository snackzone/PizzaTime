var React = require('react');
var ReactRouter = require('react-router');

var LoggedOut = React.createClass({
  render: function () {
    var Link = ReactRouter.Link;
    return (
      <div className="logged-out">
        <h1>You are not logged in.</h1>
        <Link to="session/new">Sign in</Link> or <a href="/users/new">Sign up.</a>
      </div>
    );
  }
});


module.exports = LoggedOut;
