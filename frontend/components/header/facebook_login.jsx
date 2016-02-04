var React = require('react');
var SessionApiUtil = require('../../util/session_api_util');

var FacebookLogin = React.createClass({
  render: function () {
    return (
      <a href="/auth/facebook" className="big-red-button facebook">
        sign in with
      </a>
    );
  }
});

module.exports = FacebookLogin;
