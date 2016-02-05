var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var UserStore = require('../../stores/user_store');
var UserApiUtil = require('../../util/user_api_util');
var UserNav = require('./user_nav');

var UserShow = React.createClass({
  getInitialState: function () {
    window.scrollTo(0, 0);
    return ({
      user: UserStore.find(this.props.params.id),
      isCurrentUser: CurrentUserStore.isCurrentUser(this.props.params.id)
    });
  },

  componentWillMount: function () {
    if (!this.state.user.id) {
      UserApiUtil.fetchById(this.props.params.id);
    }
    this.currentUserListener = CurrentUserStore.addListener(this.change);
    this.userListener = UserStore.addListener(this.change);
  },

  change: function () {
    this.setState({
      user: UserStore.find(this.props.params.id),
      isCurrentUser: CurrentUserStore.isCurrentUser(this.props.params.id)
    });
  },

  componentWillUnmount: function () {
    this.currentUserListener.remove();
    this.userListener.remove();
  },

  componentWillReceiveProps: function(nextProps) {
    var id = parseInt(nextProps.params.id);
    this.setState({
      user: UserStore.find(id),
      isCurrentUser: CurrentUserStore.isCurrentUser(id)
    });
  },

  render: function () {
    return (
      <div>
        <UserNav user={this.state.user} isCurrentUser={this.state.isCurrentUser}/>
        <section className="user-show">
        {this.props.children}
        </section>
      </div>
    );
  }
});

module.exports = UserShow;
