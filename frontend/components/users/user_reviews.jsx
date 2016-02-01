var React = require('react');
var ReviewIndex = require('../reviews/index');
var UserStore = require('../../stores/user_store');
var CurrentUserStore = require('../../stores/current_user_store');
var NoReviewsCurrentUser = require('./no_reviews_current_user');
var NoReviewsUser = require('./no_reviews_user');

var UserReviews = React.createClass({
  getInitialState: function () {
    var id = this.props.params.id;
    return ({
      user: UserStore.find(id),
      isCurrentUser: CurrentUserStore.isCurrentUser(id)
    });
  },

  componentDidMount: function () {
    this.userListener =
      UserStore.addListener(this._change);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  _change: function () {
    this.setState({user: UserStore.find(this.props.params.id)});
  },

  render: function () {
    var user = this.state.user;

    if (user.reviews.length > 0) {
      renderComponent = <ReviewIndex user={user}/>;
    } else if (this.state.isCurrentUser) {
      renderComponent = <NoReviewsCurrentUser/>;
    } else {
      renderComponent = <NoReviewsUser/>;
    }

    return (
      <div className="reviews">
        <h2>Reviews</h2>
        {renderComponent}
      </div>
    );
  }
});

module.exports = UserReviews;
