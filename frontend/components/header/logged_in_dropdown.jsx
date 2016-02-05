var React = require('react');
var SessionApiUtil = require('../../util/session_api_util');
var History = require('react-router').History;
var ReactRouter = require('react-router');


var LoggedInDropdown = React.createClass({
  mixins: [History],

  handleSignOut: function (e) {
    e.preventDefault();
    SessionApiUtil.signOut(successCB.bind(this));
  },

  render: function () {
    var user = this.props.user;
    var Link = ReactRouter.Link;
    return (
      <ul className="logged-in-dropdown">
        <li className="group">
          <Link to={"/users/" + user.id} className="dropdown-username profilename">
            <img src={user.photo_url} className="dropdown-avatar"/>
          </Link>
          <Link to={"/users/" + user.id} className="dropdown-username">
            {user.firstname} {user.surname.substring(0, 1)}.
          </Link>
          <Link to={"/users/" + user.id + "/reviews"} className="dropdown-username">
            Reviews
          </Link>
          <div className="sprites-container">
            <Link to={"/users/" + user.id + "/photos"} className="dropdown-username">
              <img src={window.PizzaTime.imageUrls.sprites.photos}/>
            </Link>
            <Link to={"/users/" + user.id + "/edit"} className="dropdown-username">
              <img src={window.PizzaTime.imageUrls.sprites.settings}/>
            </Link>
          </div>

        </li>
        <li>
          <a href="#" className="sign-out-link" onClick={this.handleSignOut}>Log Out</a>
        </li>
      </ul>
    );
  }
});

function successCB (id) {
  this.history.pushState({}, "/");
}

module.exports = LoggedInDropdown;
