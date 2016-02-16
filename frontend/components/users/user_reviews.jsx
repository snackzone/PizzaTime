var React = require('react');
var ReviewIndex = require('../reviews/index');
var UserStore = require('../../stores/user_store');
var CurrentUserStore = require('../../stores/current_user_store');
var NoReviewsCurrentUser = require('./no_reviews_current_user');
var NoReviewsUser = require('./no_reviews_user');
var UserApiUtil = require('../../util/user_api_util');

var UserReviews = React.createClass({
  getInitialState: function () {
    var id = this.props.params.id;
    return ({
      user: UserApiUtil.fetchById(this.props.params.id),
      isCurrentUser: CurrentUserStore.isCurrentUser(id),
      loaded: false
    });
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._change);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  componentWillReceiveProps: function(nextProps) {
    var id = parseInt(nextProps.params.id);
    this.setState({
      user: UserApiUtil.fetchById(id),
      isCurrentUser: CurrentUserStore.isCurrentUser(id),
      loaded: false
    });
  },

  _change: function () {
    this.setState({
      user: UserStore.find(this.props.params.id),
      loaded: true
    });
  },

  render: function () {

    if (!this.state.loaded) {
      return (
        <div className="reviews">
          <h2>Reviews</h2>
        </div>
      );
    }

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
