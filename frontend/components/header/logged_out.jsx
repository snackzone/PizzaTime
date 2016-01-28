var React = require('react');
var ReactRouter = require('react-router');

var LoggedOut = React.createClass({
  render: function () {
    var Link = ReactRouter.Link;
    return (
      <div className="logged-out">
        <h1>You are not logged in.</h1>
        <Link to="session/new">Sign in</Link> or <Link to="/users/new">Sign up.</Link>
      </div>
    );
  }
});


module.exports = LoggedOut;
