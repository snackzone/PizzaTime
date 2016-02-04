var React = require('react');
var ReactRouter = require('react-router');
var SessionApiUtil = require('../../util/session_api_util');
var History = require('react-router').History;
var FacebookLogin = require('./facebook_login');


var LoggedOut = React.createClass({
  mixins: [History],

  guestLogin: function (e) {
    e.preventDefault();

    var credentials = {email: "mike@turtlepower.com", password: "cowabunga"};
    SessionApiUtil.submitSignInCredentials(
      credentials, function successCB (id) {
        this.history.pushState({}, "users/" + id + "/reviews");
      }.bind(this)
    );
  },

  render: function () {
    var Link = ReactRouter.Link;
    return (
      <div className="logged-out group">
        <a href="#" className="header-guest-login-button" onClick={this.guestLogin}>guest login</a>
        <div className="logged-out-link-container">
          <div className="header-tiny-link-container">
            <Link to="/session/new" className="header-tiny-link">Sign in</Link>
            <Link to="/users/new" className="header-tiny-link">Sign up</Link>
          </div>
          <FacebookLogin/>
        </div>
      </div>
    );
  }
});


module.exports = LoggedOut;
