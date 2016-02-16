var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var UserApiUtil = require('../../util/user_api_util');
var ReactRouter = require('react-router');
var UserStore = require('../../stores/user_store');
var UpdateAvatarButton = require('./update_avatar_button');

var UserNav = React.createClass({
  render: function () {
    var user = this.props.user;

    var Link = ReactRouter.Link;

    if (!user.id) {
      return (
        <nav className="user-nav">
        </nav>
      );
    }

    var updateAvatar;
    var reviewLinkText = user.firstname + "'s Reviews";
    var photoLinkText = user.firstname + "'s Photos";

    if (this.props.isCurrentUser) {
      reviewLinkText = "Your Reviews";
      photoLinkText = "Your Photos";
      UpdateAvatar = <UpdateAvatarButton user={user}/>;
    }

    return (
      <nav className="user-nav">
        <div className="user-nav-container group">

          <div className="user-nav-left group">
            <div className="photo-box">
              <img className="profile-photo" src={user.photo_url}/>
              {UpdateAvatar}
            </div>
          </div>

          <div className="user-nav-middle group">
            <h1 className="user-name">
              {user.firstname} {user.surname.substring(0, 1)}.
            </h1>
          </div>


          <div className="user-nav-right group">
            <Link to={"/users/" + user.id + "/reviews"} id="reviews" className="user-nav-links">{reviewLinkText}</Link>
            <Link to={"/users/" + user.id + "/photos"} id="photos" className="user-nav-links  ">{photoLinkText}</Link>
            <Link to={"/reviews/search"} id="search" className="user-nav-links">Write a Review</Link>
          </div>

        </div>
      </nav>
    );
  }
});

function _parseLocationHash(hash) {
  var re = /users\/(\d+)/;
  return hash.match(re)[1];
}

module.exports = UserNav;
