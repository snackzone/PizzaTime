var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var UserApiUtil = require('../../util/user_api_util');
var ReactRouter = require('react-router');
var UserStore = require('../../stores/user_store');


var UserNav = React.createClass({
  getInitialState: function () {
    var id = this.user_id = _parseLocationHash(window.location.hash);
    return {
      isCurrentUser: CurrentUserStore.isCurrentUser(id),
      user: UserStore.find(id)
    };
  },

  componentWillMount: function () {
    if (!this.state.user.id) {
      UserApiUtil.fetchById(this.user_id);
    }
    this.currentUserListener =
      CurrentUserStore.addListener(this.forceUpdate.bind(this));
    this.userListener = UserStore.addListener(this._change);
  },

  _change: function () {
    this.setState({
      isCurrentUser: CurrentUserStore.isCurrentUser(this.user_id),
      user: UserStore.find(this.user_id)
    });
  },

  componentWillUnmount: function () {
    this.currentUserListener.remove();
    this.userListener.remove();
  },

  changeFile: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      if (this.state.isCurrentUser) {
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
    var id = CurrentUserStore.currentUser().id;
    UserApiUtil.updatePhoto(formData, id);
  },

  render: function () {
    var user = this.state.user;
    // var currentUser = CurrentUserStore.currentUser();
    var Link = ReactRouter.Link;

    if (!this.state.user.id) {
      return (
        <div>
          loading...
        </div>
      );
    }

    var updatePhotoLabel, updatePhotoInput, updateProfile, reviewLinkText;

    reviewLinkText = this.state.user.firstname + "'s Reviews";

    if (this.state.isCurrentUser) {
      updatePhotoLabel = <label htmlFor="file" className="change-profile-picture">Update Photo.</label>;
      updatePhotoInput = (
                      <input
                        id="file"
                        className="file"
                        type="file"
                        onChange={this.changeFile}
                      />
                    );
      updateProfile = <Link to={"/users/" + user.id + "/edit"}>Update Profile</Link>;
      reviewLinkText = "Your Reviews";
    }

    return (
      <nav className="user-nav">
        <div className="user-nav-container group">
          <div className="user-nav-left group">
            <div className="photo-box">
              <img className="profile-photo" src={user.photo_url}/>


              {updatePhotoLabel}
            </div>
            <div className="profile-info-container">
              <h1 className="user-name">
                {user.firstname} {user.surname.substring(0, 1)}.
              </h1>

              {updatePhotoInput}
            </div>
          </div>
          <div className="user-nav-right group">
            {updateProfile}
            <Link to={"/users/" + user.id + "/reviews"}>{reviewLinkText}</Link>
          </div>
        </div>
      </nav>
    );
  }
});

function _parseLocationHash(hash) {
  var re = /#\/users\/(\d+)/;
  return hash.match(re)[1];
}

module.exports = UserNav;
