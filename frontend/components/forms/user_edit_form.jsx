var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserApiUtil = require('../../util/user_api_util');
var FlashStore = require('../../stores/flash_store');
var FlashActions = require('../../actions/flash_actions');
var History = require('react-router').History;
var CurrentUserStore = require('../../stores/current_user_store');


var UserEditForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    var currentUser = CurrentUserStore.currentUser();
    return {
      firstname: currentUser.firstname,
      surname: currentUser.surname,
      email: currentUser.email,
      zip: currentUser.zip,
      id: currentUser.id,
      flash: FlashStore.all()
    };
  },

  componentDidMount: function () {
    this.flashListener = FlashStore.addListener(this._updateFlash);
  },

  componentWillUnmount: function () {
    this.flashListener.remove();
    FlashActions.receiveFlash([]);
  },

  _updateFlash: function () {
    this.setState({flash: FlashStore.all()});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var user = Object.assign({}, this.state);
    UserApiUtil.updateInfo(user);
  },

  render: function () {
    var errors;
    if (this.state.flash.length > 0) {
      var messages = this.state.flash.map(function(error, index) {
        return <li key={index}>{error}</li>;
      });
      errors = (
        <ul className="user-form-errors edit-errors">
          {messages}
        </ul>
      );
    }

    return (
      <section className="edit-form-container group">
        {errors}
        <form className="edit-user-form form" onSubmit={this.handleSubmit}>
          <h2>Edit Your Info</h2>
          <p className="input-container group">
            <label>First Name:</label>
            <input type="text" valueLink={this.linkState('firstname')}/>
          </p>

          <p className="input-container group">
            <label>Last Name:</label>
            <input type="text" valueLink={this.linkState('surname')}/>
          </p>

          <p className="input-container group">
            <label>Email:</label>
            <input type="text" valueLink={this.linkState('email')}/>
          </p>

          <p className="input-container group">
            <label>Zip Code:</label>
            <input type="text" valueLink={this.linkState('zip')}/>
          </p>
          <button>Update Profile</button>
        </form>
      </section>
    );
  }
});

module.exports = UserEditForm;
