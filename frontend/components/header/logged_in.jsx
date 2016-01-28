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
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <button onClick={this.handleSignOut}>Sign Out</button>
      </div>
    );
  }
});


module.exports = LoggedIn;
