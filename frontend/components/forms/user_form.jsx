var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../../util/api_util');

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
    ApiUtil.createUser(user);
  },

  render: function () {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input type="text" valueLink={this.linkState('firstname')}/>
        </label>

        <label>
          Last Name:
          <input type="text" valueLink={this.linkState('surname')}/>
        </label>

        <label>
          Email:
          <input type="text" valueLink={this.linkState('email')}/>
        </label>

        <label>
          Zip Code:
          <input type="text" valueLink={this.linkState('zip')}/>
        </label>

        <label>
          Password:
          <input type="password" valueLink={this.linkState('password')}/>
        </label>

        <label>
          Confirm Password:
          <input type="password" valueLink={this.linkState('password_confirmation')}/>
        </label>

        <button>Sign Up.</button>
      </form>
    );
  }
});

module.exports = UserForm;
