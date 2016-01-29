var React = require('react');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionApiUtil = require('../../util/session_api_util');

var SessionForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return {
      email: "",
      password: ""
    };
  },

  guestLogin: function (e) {
    e.preventDefault();

    var credentials = {email: "guest@pizza-time.com", password: "pizzatime"};
    SessionApiUtil.submitSignInCredentials(
      credentials, successCB.bind(this), errorCB.bind(this)
    );
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var credentials = Object.assign({}, this.state);
    SessionApiUtil.submitSignInCredentials(
      credentials, successCB.bind(this), errorCB.bind(this)
    );
  },

  render: function () {
    return (
      <section className="form-container group">
        <form className="session-form form group" onSubmit={this.handleSubmit}>
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
          <a href="#" onClick={this.guestLogin}>Login as a guest user.</a>
          <button>Log In.</button>
        </form>
      </section>
    );
  }
});

var successCB = function (id) {
  this.history.pushState({}, "users/" + id);
};

var errorCB = function () {

};

module.exports = SessionForm;
