var React = require('react');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionApiUtil = require('../../util/session_api_util');
var ReactRouter = require('react-router');
var FlashStore = require('../../stores/flash_store');


var SessionForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return {
      email: "",
      password: ""
    };
  },

  componentDidMount: function () {
    this.flashListener = FlashStore.addListener(this._updateFlash);
  },

  componentWillUnmount: function () {
    this.flashListener.remove();
  },

  _updateFlash: function () {
    this.setState({flash: FlashStore.all()});
  },

  guestLogin: function (e) {
    e.preventDefault();

    var credentials = {email: "guest@pizza-time.com", password: "pizzatime"};
    SessionApiUtil.submitSignInCredentials(
      credentials, successCB.bind(this)
    );
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var credentials = Object.assign({}, this.state);
    SessionApiUtil.submitSignInCredentials(
      credentials, successCB.bind(this)
    );

    this.setState({password: ""});
  },

  render: function () {
    var Link = ReactRouter.Link;
    return (
      <section className="form-container group">
        <form className="session-form form group" onSubmit={this.handleSubmit}>
          <h2>Log In</h2>
          <p>Please enter your email address and password to log in.</p>
          <p className="session-form-errors">{this.state.flash}</p>
          <p className="input-container group">
            <label>Email Address</label>
            <input type="text" valueLink={this.linkState('email')}/>
          </p>
          <p className="input-container group">
            <label>Password</label>
            <input type="password" valueLink={this.linkState('password')}/>
          </p>
          <a href="#" className="guest-login" onClick={this.guestLogin}>Login as a guest user.</a>
          <button>Log In.</button>
        </form>

        <div className="session-form-signup form">
          <h2>Don't have an account yet?</h2>
          <Link to="/users/new" className="sign-up-button">Sign up.</Link>
        </div>
      </section>
    );
  }
});

successCB = function (id) {
  this.history.pushState({}, "users/" + id);
};

module.exports = SessionForm;
