var React = require('react');
var ReviewIndex = require('../reviews/index');
var UserStore = require('../../stores/user_store');
var NoReviews = require('./no_reviews');

var UserReviews = React.createClass({
  getInitialState: function () {
    return {user: UserStore.find(this.props.params.id)};
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
    var renderComponent = user.reviews.length < 1 ?
      <NoReviews/> : <ReviewIndex user={user}/>;

    return (
      <div className="reviews">
        <h2>Reviews</h2>
        {renderComponent}
      </div>
    );
  }
});

module.exports = UserReviews;
