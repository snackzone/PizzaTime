var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var UserApiUtil = require('../../util/user_api_util');
var ReactRouter = require('react-router');
var UserStore = require('../../stores/user_store');

var UserNav = React.createClass({
  changeFile: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      if (this.props.isCurrentUser) {
        this.updatePhoto(file);
      }
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    }
  },

  updatePhoto: function (photo) {
    var formData = new FormData();
    formData.append("user[photo]", photo);
    var id = this.props.user.id;
    UserApiUtil.updateAvatar(formData, id);
  },

  render: function () {
    var user = this.props.user;

    var Link = ReactRouter.Link;

    if (!user.id) {
      return (
        <nav className="user-nav">
        </nav>
      );
    }

    var updatePhotoLabel, updatePhotoInput, updateProfile;
    var reviewLinkText = user.firstname + "'s Reviews";
    var photoLinkText = user.firstname + "'s Photos";

    if (this.props.isCurrentUser) {
      updatePhotoLabel = <label htmlFor="file" className="change-profile-picture">Update Photo.</label>;
      updatePhotoInput = <input
                           id="file"
                           className="file"
                           type="file"
                           onChange={this.changeFile}
                         />;
      reviewLinkText = "Your Reviews";
      photoLinkText = "Your Photos";
    }

    return (
      <nav className="user-nav">
        <div className="user-nav-container group">

          <div className="user-nav-left group">
            <div className="photo-box">
              <img className="profile-photo" src={user.photo_url}/>
              {updatePhotoLabel}
              {updatePhotoInput}
            </div>
          </div>

          <div className="user-nav-middle group">
            <h1 className="user-name">
              {user.firstname} {user.surname.substring(0, 1)}.
            </h1>
          </div>


          <div className="user-nav-right group">
            <Link to={"/users/" + user.id + "/reviews"}>{reviewLinkText}</Link>
            <Link to={"/users/" + user.id + "/photos"}>{photoLinkText}</Link>
            <Link to={"/reviews/search"}>Search Restaurants</Link>
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
