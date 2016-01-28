var React = require('react');
var LoggedIn = require('./logged_in');
var LoggedOut = require('./logged_out');
var CurrentUserStore = require('../../stores/current_user_store');

var LoginLogout = React.createClass({
  getInitialState: function () {
    return (
      {loggedInStatus: window.PizzaTime.currentUserId ? true : false}
    );
  },

  componentDidMount: function () {
    this.currentUserListenerToken =
      CurrentUserStore.addListener(this._change);
  },

  _change: function () {
    this.setState({loggedInStatus: CurrentUserStore.loggedInStatus() });
  },

  render: function () {

    var display = this.state.loggedInStatus ? <LoggedIn/> : <LoggedOut/>;

    return (
      <div>
        {display}
      </div>
    );
  }
});


module.exports = LoginLogout;
