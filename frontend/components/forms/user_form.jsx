var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserApiUtil = require('../../util/api_util');

var UserForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      firstname: "",
      surname: "",
      email: "",
      zip: "",
      password: "",
      password_confirmation: ""
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var user = Object.assign({}, this.state);
    UserApiUtil.createUser(user);
  },

  render: function () {
    return (
      <section className="form-container group">
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

module.exports = UserForm;
