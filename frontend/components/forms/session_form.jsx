var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../../util/api_util');

var SessionForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      email: "",
      password: ""
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var credentials = Object.assign({}, this.state);
    ApiUtil.submitSignInCredentials(credentials);
  },

  render: function () {
    return (
      <form className="session-form" onSubmit={this.handleSubmit}>
        <label>
          Email
          <input type="text" valueLink={this.linkState('email')}/>
        </label>

        <label>
          Password
          <input type="password" valueLink={this.linkState('password')}/>
        </label>

        <button>Sign In.</button>
      </form>
    );
  }
});

module.exports = SessionForm;
