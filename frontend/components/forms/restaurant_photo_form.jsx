var React = require('react');
var RestaurantApiUtil = require('../../util/restaurant_api_util');
var UserApiUtil = require('../../util/user_api_util');
var Dropzone = require('react-dropzone');

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

    formData.append("photo[caption]", this.state.caption);
    formData.append("photo[upload]", this.state.imageFile);

    UserApiUtil.uploadRestaurantPhoto(this.props.restaurant.id, formData, this.resetForm);
  },

  resetForm: function () {
    this.setState({caption: "", imageFile: null, imageUrl: ""});
    this.props.closeForm();
  },

  render: function () {
    var buttonClass = "photo-modal-button";
    if (!this.state.imageFile) {
      buttonClass += " disabled";
    }
    var disabled = this.state.caption.length > 99 ? "disabled" : "";

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
                    <input
                      type="text"
                      className="photo-modal-caption"
                      placeholder="Add a caption (optional)"
                      onChange={this.changeCaption}
                      value={this.state.caption}
                    />
                  </div> : null}



            {!!this.state.imageFile ?
              <button
                disabled={!!disabled}
                className={"big-red-button modal-submit-button " + disabled}>
                Submit
              </button> : null}
          </form>

        <div className="modal-cancel-button" onClick={this.props.closeForm}/>
      </div>
    </div>
    );
  }
});

module.exports = RestaurantPhotoForm;
