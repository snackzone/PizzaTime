var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserApiUtil = require('../../util/user_api_util');
var FlashStore = require('../../stores/flash_store');
var FlashActions = require('../../actions/flash_actions');

var UserForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      firstname: "",
      surname: "",
      email: "",
      zip: "",
      password: "",
      password_confirmation: "",
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
    UserApiUtil.createUser(user, successCB);
  },

  render: function () {
    var errors;
    if (this.state.flash.length > 0) {
      var messages = this.state.flash.map(function(error, index) {
        return <li key={index}>{error}</li>;
      });
      errors = (
        <ul className="user-form-errors">
          <h2>Your form contains the following errors:</h2>
          {messages}
        </ul>
      );
    }

    return (
      <section className="form-container group">
        {errors}
        <form className="user-form form" onSubmit={this.handleSubmit}>
          <h2>Sign Up</h2>
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

          <p className="input-container group">
            <label>Password:</label>
            <input type="password" valueLink={this.linkState('password')}/>
          </p>

          <p className="input-container group">
            <label>Confirm Password:</label>
            <input type="password" valueLink={this.linkState('password_confirmation')}/>
          </p>

          <button>Sign Up.</button>
        </form>
      </section>
    );
  }
});

successCB = function (id) {
  this.history.pushState({}, "users/" + id);
};

module.exports = UserForm;
