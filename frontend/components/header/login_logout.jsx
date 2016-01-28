var React = require('react');
var LoggedIn = require('./logged_in');
var LoggedOut = require('./logged_out');
var CurrentUserStore = require('../../stores/current_user_store');

var LoginLogout = React.createClass({
  getInitialState: function () {
    return (
      { currentUser: CurrentUserStore.currentUser() }
    );
  },

  componentDidMount: function () {
    this.currentUserListenerToken =
      CurrentUserStore.addListener(this._change);
  },

  _change: function () {
    this.setState({ currentUser: CurrentUserStore.currentUser() });
  },

  render: function () {
    var currentUser = this.state.currentUser;

    var display = currentUser ?
      <LoggedIn name={currentUser.firstname} /> : <LoggedOut/>;

    return (
      <div>
        {display}
      </div>
    );
  }
});


module.exports = LoginLogout;
