var React = require('react');
var UserApiUtil = require('../../util/user_api_util');
var Dropzone = require('react-dropzone');

var UserAvatarForm = React.createClass({
  getInitialState: function () {
    return({
      imageFile: null,
      imageUrl: ""
    });
  },

  changeFile: function (files) {
    var reader = new FileReader();
    var file = files[0];

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
    formData.append("user[photo]", this.state.imageFile);
    UserApiUtil.updateAvatar(formData, this.props.user.id, this.resetForm);
  },

  resetForm: function () {
    this.setState({imageFile: null, imageUrl: ""});
    this.props.closeForm();
  },

  render: function () {
    var buttonClass = "photo-modal-button";

    return (
      <div className="screen-blur">
        <div className="photo-form-container">

          <form className="group" onSubmit={this.handleSubmit}>
              {!this.state.imageFile ?
                <Dropzone className="restaurant-dropzone" ref="dropzone" onDrop={this.changeFile}>
                  <div>
                    Drag and drop a photo here.
                  </div>
                </Dropzone> : null}



                {!!this.state.imageFile ?
                  <div className="image-preview-container">
                    <img
                      className="preview-image"
                      src={this.state.imageUrl}
                    />
                  </div> : null}



            {!!this.state.imageFile ?
              <button
                className={"big-red-button modal-submit-button "}>
                Submit
              </button> : null}
          </form>

        <div className="modal-cancel-button" onClick={this.props.closeForm}/>
      </div>
    </div>
    );
  }
});

module.exports = UserAvatarForm;
