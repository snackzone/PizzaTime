var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var UserApiUtil = require('../../util/user_api_util');

var UserNav = React.createClass({

  getInitialState: function () {
    return {imageFile: null, imageUrl: ""};
  },

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
      this.setState({imageFile: file, imageUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("user[photo]", this.state.imageFile);
    var id = CurrentUserStore.currentUser().id;
    UserApiUtil.updatePhoto(formData, id);
  },

  render: function () {
    var currentUser = CurrentUserStore.currentUser();

    return (
      <nav className="user-nav">
        <div className="user-nav-container group">
          <div className="photo-box">
            <img className="profile-photo" src={currentUser.photo_url}/>
            <label htmlFor="file" className="change-profile-picture">Add a photo.</label>
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
              onSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </nav>
    );
  }
});

{/*<form onSubmit={this.handleSubmit}>
  <label>Add a profile photo:
    <input type="file" onChange={this.changeFile} />
  </label>

  <img className="preview-image" src={this.state.imageUrl}/>
  <button>Submit</button>
</form>*/}

module.exports = UserNav;
