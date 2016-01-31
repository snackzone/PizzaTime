var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var UserApiUtil = require('../../util/user_api_util');
var ReactRouter = require('react-router');


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

function _parseLocationHash(hash) {
  var re = /#\/users\/(\d+)/;
  return hash.match(re)[1];
}

module.exports = UserNav;
