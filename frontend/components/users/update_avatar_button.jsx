var React = require('react');
var UserAvatarForm = require('../forms/user_avatar_form');

var UpdateAvatarButton = React.createClass({
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
      <div className="change-profile-picture">
        <a
          href="#"
          onClick={this.openForm}>
          Update Photo
        </a>
      {this.state.active ?
        <UserAvatarForm
          user={this.props.user}
          closeForm={this.closeForm}/>
        : null}
      </div>
    );
  }
});

module.exports = UpdateAvatarButton;
