var React = require('react');
var SessionApiUtil = require('../../util/session_api_util');
var CurrentUserStore = require('../../stores/current_user_store');
var History = require('react-router').History;


var LoggedIn = React.createClass({
  mixins: [History],

  handleSignOut: function (e) {
    e.preventDefault();

    SessionApiUtil.signOut(function () {
      this.history.pushState({}, "/");
    }.bind(this));
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
