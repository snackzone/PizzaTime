var React = require('react');
var UserApiUtil = require('../../util/user_api_util');

var PhotoDeleteButton = React.createClass({
  handleClick: function () {
    console.log("click");
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
