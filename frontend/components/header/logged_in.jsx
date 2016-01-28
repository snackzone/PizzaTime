var React = require('react');
var ApiUtil = require('../../util/api_util');
var CurrentUserStore = require('../../stores/current_user_store');

var LoggedIn = React.createClass({
  handleSignOut: function (e) {
    e.preventDefault();
    //...just in case.
    ApiUtil.signOut();
  },

  render: function () {
    var name = CurrentUserStore.currentUser().firstname;

    return (
      <div>
        <h1>Hello, {name}!</h1>
        <button onClick={this.handleSignOut}>Sign Out</button>
      </div>
    );
  }
});


module.exports = LoggedIn;
