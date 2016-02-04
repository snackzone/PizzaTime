var React = require('react');
var SessionApiUtil = require('../../util/session_api_util');

var FacebookLogin = React.createClass({
  render: function () {
    return (

      <a href="/auth/facebook">LOG IN WITH FACEBOOK</a>
    );
  }
});

module.exports = FacebookLogin;
