var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var UserApiUtil = require('../../util/user_api_util');
var UserNav = require('./user_nav');

var UserShow = React.createClass({
  render: function () {
    var currentUser = CurrentUserStore.currentUser();

    return (
      <div>
        <UserNav/>
        <section className="user-show">
        {this.props.children}
        </section>
      </div>
    );
  }
});

module.exports = UserShow;
