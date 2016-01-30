var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var UserApiUtil = require('../../util/user_api_util');
var ReactRouter = require('react-router');


var UserNav = React.createClass({
  componentDidMount: function () {
    this.currentUserListener =
      CurrentUserStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount: function () {
    this.currentUserListener.remove();
  },

  changeFile: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.updatePhoto(file);
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
    var currentUser = CurrentUserStore.currentUser();
    var Link = ReactRouter.Link;

    return (
      <nav className="user-nav">
        <div className="user-nav-container group">
          <div className="user-nav-left group">
            <div className="photo-box">
              <img className="profile-photo" src={currentUser.photo_url}/>
              <label htmlFor="file" className="change-profile-picture">Update Photo.</label>
            </div>
            <div className="profile-info-container">
              <h1 className="user-name">
                {currentUser.firstname} {currentUser.surname.substring(0, 1)}.
              </h1>
              <input
                id="file"
                className="file"
                type="file"
                onChange={this.changeFile}
              />
            </div>
          </div>
          <div className="user-nav-right group">
            <Link to={"/users/" + currentUser.id + "/edit"}>Update Profile</Link>
            <Link to={"/users/" + currentUser.id + "/reviews"}>Your Reviews</Link>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = UserNav;
