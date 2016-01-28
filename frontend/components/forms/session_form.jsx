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
      <section className="form-container group">
        <form className="form group" onSubmit={this.handleSubmit}>
          <h2>Log In</h2>
          <p>Please enter your email address and password to log in.</p>
          <p className="input-container group">
            <label>Email Address</label>
            <input type="text" valueLink={this.linkState('email')}/>
          </p>
          <p className="input-container group">
            <label>Password</label>
            <input type="password" valueLink={this.linkState('password')}/>
          </p>
          <button>Log In.</button>
        </form>
      </section>
    );
  }
});

module.exports = SessionForm;
