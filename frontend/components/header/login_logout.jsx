var React = require('react');
var LoggedIn = require('./logged_in');
var LoggedOut = require('./logged_out');
var CurrentUserStore = require('../../stores/current_user_store');
var SessionApiUtil = require('../../util/session_api_util');

var LoginLogout = React.createClass({
  componentDidMount: function () {
    this.currentUserListenerToken =
      CurrentUserStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount: function () {
    this.currentUserListenerToken.remove();
  },

  render: function () {
    var currentUser = CurrentUserStore.currentUser();

    var display = currentUser ?
      <LoggedIn name={currentUser.firstname} /> : <LoggedOut/>;

    return (
      <div className="login-logout">
        {display}
      </div>
    );
  }
});


module.exports = LoginLogout;
