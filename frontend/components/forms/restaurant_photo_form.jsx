var React = require('react');
var UserApiUtil = require('../../util/user_api_util');

var RestaurantPhotoForm = React.createClass({
  getInitialState: function () {
    return({
      imageFile: null,
      caption: "",
      imageUrl: ""
    });
  },

  changeCaption: function(e) {
    this.setState({ caption: e.currentTarget.value });
  },

  changeFile: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: reader.result });
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageFile: null, imageUrl: "" });
    }
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var formData = new FormData();

    formData.append("photo[caption]", this.state.caption);
    formData.append("photo[upload]", this.state.imageFile);

    UserApiUtil.uploadPhoto(this.props.restaurantId, formData, this.resetForm);

  },

  resetForm: function () {
    this.setState({caption: "", imageFile: null, imageUrl: ""});
  },

  render: function () {
    return (
      <div>
        <h2>New Post</h2>

        <form onSubmit={this.handleSubmit}>

          <label>Title
            <input
              type="text"
              placeholder="Add a caption (optional)"
              onChange={this.changeCaption}
              value={this.state.caption}
            />
          </label>

          <label>
            <input type="file" onChange={this.changeFile} />
          </label>

          <img className="preview-image" src={this.state.imageUrl}/>
          <button>Submit</button>
        </form>
      </div>
    );
  }
});

module.exports = RestaurantPhotoForm;
