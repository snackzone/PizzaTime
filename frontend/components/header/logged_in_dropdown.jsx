var React = require('react');
var SessionApiUtil = require('../../util/session_api_util');
var History = require('react-router').History;
var ReactRouter = require('react-router');


var LoggedInDropdown = React.createClass({
  mixins: [History],

  handleSignOut: function (e) {
    e.preventDefault();

    SessionApiUtil.signOut(function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  render: function () {
    var user = this.props.user;
    var Link = ReactRouter.Link;
    return (
      <ul className="logged-in-dropdown">
        <li className="group">
          <Link to={"/users/" + user.id} className="dropdown-username">
            <img src={user.photo_url} className="dropdown-avatar"/>
          </Link>
          <Link to={"/users/" + user.id} className="dropdown-username">
            {user.firstname} {user.surname.substring(0, 1)}.
          </Link>
        </li>
        <li>
          <a href="#" className="sign-out-link" onClick={this.handleSignOut}>Log Out</a>
        </li>
      </ul>
    );
  }
});

module.exports = LoggedInDropdown;
