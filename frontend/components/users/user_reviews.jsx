var React = require('react');
var ReviewIndex = require('../reviews/index');
var CurrentUserStore = require('../../stores/current_user_store');

var UserReviews = React.createClass({
  getInitialState: function () {
    return {user: CurrentUserStore.currentUser()};
  },

  componentDidMount: function () {
    this.currentUserListener =
      CurrentUserStore.addListener(this._change);
  },

  componentWillUnmount: function () {
    this.currentUserListener.remove();
  },

  _change: function () {
    this.setState({user: CurrentUserStore.currentUser()});
  },

  render: function () {
    return (
      <div>
        REVIEWS.
        <ReviewIndex user={this.state.user}/>
      </div>
    );
  }
});

module.exports = UserReviews;
