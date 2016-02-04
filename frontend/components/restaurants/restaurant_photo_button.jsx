var React = require('react');
var RestaurantPhotoForm = require('../forms/restaurant_photo_form');

var RestaurantPhotoButton = React.createClass({
  getInitialState: function () {
    return { active: false };
  },

  openForm: function(e) {
    e.preventDefault();
    this.setState({ active: true });
  },

  closeForm: function () {
    this.setState({ active: false });
  },

  render: function () {
    return (
      <div className="add-photo-button-container">
        <a
          href="#"
          className="add-photo-button big-red-button"
          onClick={this.openForm}>
          Add a Photo
        </a>
      {this.state.active ?
        <RestaurantPhotoForm
          restaurant={this.props.restaurant}
          closeForm={this.closeForm}/>
        : null}
      </div>
    );
  }
});

module.exports = RestaurantPhotoButton;
