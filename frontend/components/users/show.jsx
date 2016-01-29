var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var UserApiUtil = require('../../util/user_api_util');

var UserShow = React.createClass({

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
      <section className="user-show-container">
        <img className="profile-photo" src={currentUser.photo_url}/>
        <h1>Hello, user!</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Add a profile photo:
            <input type="file" onChange={this.changeFile} />
          </label>

          <img className="preview-image" src={this.state.imageUrl}/>
          <button>Submit</button>
        </form>
      </section>
    );
  }
});

module.exports = UserShow;
