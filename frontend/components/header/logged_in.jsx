var React = require('react');
var SessionApiUtil = require('../../util/session_api_util');
var CurrentUserStore = require('../../stores/current_user_store');

var LoggedIn = React.createClass({
  handleSignOut: function (e) {
    e.preventDefault();
    //...just in case.
    SessionApiUtil.signOut();
  },

  render: function () {
    return (
      <div className="logged-in">
        <h1>Hello, {this.props.name}!</h1>
        <button onClick={this.handleSignOut}>Sign Out</button>
      </div>
    );
  }
});


module.exports = LoggedIn;
