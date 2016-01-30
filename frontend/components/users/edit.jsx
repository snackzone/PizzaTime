var React = require('react');
var UserEditForm = require('../forms/user_edit_form');

var UserEdit = React.createClass({
  render: function () {
    return (
      <div>
        <UserEditForm/>
      </div>
    );
  }
});

module.exports = UserEdit;
