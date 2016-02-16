var React = require('react');
var PhotoApiUtil = require('../../util/photo_api_util');

var PhotoDeleteButton = React.createClass({
  handleClick: function () {
    PhotoApiUtil.deleteRestaurantPhoto(this.props.photo);
  },

  render: function () {
    return (
      <div
        className="user-photo-delete-button"
        onClick={this.handleClick}>
      </div>
    );
  }
});

module.exports = PhotoDeleteButton;
