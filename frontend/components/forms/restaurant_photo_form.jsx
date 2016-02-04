var React = require('react');
var RestaurantApiUtil = require('../../util/restaurant_api_util');
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

    UserApiUtil.uploadPhoto(this.props.restaurant.id, formData, this.resetForm);
  },

  resetForm: function () {
    RestaurantApiUtil.fetchRestaurant(this.props.restaurant.id);
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

          <form onSubmit={this.handleSubmit}>

              <input id="file" name="file" type="file" className="file" onChange={this.changeFile} />

            <div className="image-preview-container">

                {!this.state.imageFile ?
                  <label htmlFor="file" className="add-a-photo">
                    <img src={window.PizzaTime.imageUrls.sprites.camera}/>
                  </label> : null}

                {!!this.state.imageFile ?
                  <img
                    className="preview-image"
                    src={this.state.imageUrl}
                  /> : null}

                {!!this.state.imageFile ?
                  <input
                    type="text"
                    className="photo-modal-caption"
                    placeholder="Add a caption (optional)"
                    onChange={this.changeCaption}
                    value={this.state.caption}
                  /> : null}


            </div>
            {!!this.state.imageFile ?
              <button
                disabled={!!disabled}
                className={"big-red-button modal-submit-button " + disabled}>
                Submit
              </button> : null}
          </form>

            {!this.state.imageFile ? <p>Click to upload</p> : null}
        <div className="modal-cancel-button" onClick={this.props.closeForm}></div >
      </div>
    </div>
    );
  }
});

module.exports = RestaurantPhotoForm;
