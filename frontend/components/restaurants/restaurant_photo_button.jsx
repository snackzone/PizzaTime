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
      <div>
        <a
          href="#"
          className="add-photo-button"
          onClick={this.openForm}>
          CLICK ME
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
