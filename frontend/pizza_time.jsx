var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var Search = require('./components/search/search');
RestaurantStore = require('./stores/restaurant_store');
var Header = require('./components/header/header');
var SessionForm = require('./components/forms/session_form');
var UserForm = require('./components/forms/user_form');
var UserShow = require('./components/users/show');
var CurrentUserStore = require('./stores/current_user_store');
var SessionApiUtil = require('./util/session_api_util');
var UserEdit = require('./components/users/edit');
var UserReviews = require('./components/users/user_reviews');
var UserStore = require('./stores/user_store');
var ReviewSearch = require('./components/reviews/review_search');
var RestaurantShow = require('./components/restaurants/show');
var ReviewForm = require('./components/forms/review_form');
var UserPhotos = require('./components/users/user_photos');

var Shepherd = require('tether-shepherd');

var App = React.createClass({
  componentWillMount: function () {
    SessionApiUtil.fetchCurrentUser();
  },

  render: function () {
    return(
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Search}/>
    <Route path="session/new" component={SessionForm}/>
    <Route path="users/new" component={UserForm}/>
    <Route path="users/:id" component={UserShow} onEnter={_ensureLoggedIn}>
      <Route path="edit" component={UserEdit} onEnter={_ensureCurrentUser}/>
      <Route path="reviews" component={UserReviews}/>
      <Route path="photos" component={UserPhotos}/>
    </Route>
    <Route path="reviews/search" component={ReviewSearch}/>
    <Route path="restaurants/:id/review" component={ReviewForm} onEnter={_ensureLoggedIn}/>
    <Route path="restaurants/:id" component={RestaurantShow} onEnter={_ensureLoggedIn}>
    </Route>
  </Route>
);

function _ensureLoggedIn (nextState, replace, callback) {
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }
  function _redirectIfNotLoggedIn () {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/session/new");
    }
    callback();
  }
}

function _ensureCurrentUser (nextState, replace, callback) {
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotCurrentUser();
  } else {
    SessionApiUtil.fetchCurrentUser(_redirectIfNotCurrentUser);
  }
  function _redirectIfNotCurrentUser() {
    var id = _parseLocationHash(window.location.hash);

    function _parseLocationHash(hash) {
      var re = /#\/users\/(\d+)\/edit/;
      return hash.match(re)[1];
    }
    if (!CurrentUserStore.isCurrentUser(id)) {
      replace({}, "/");
    }
    callback();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<ReactRouter>{routes}</ReactRouter>, document.getElementById("content"));

  var tour = new Shepherd.Tour({
    defaults: {
      classes: 'shepherd-theme-arrows'
    }
  });

  tour.addStep('example', {
    title: 'Welcome to PizzaTime!',
    text: 'PizzaTime is inspired by Yelp. Find your slice in NYC!',
    attachTo: '#logo bottom',
    advanceOn: '.docs-link click',
    scrollTo: true,
    showCancelLink: true
  });

  tour.addStep('example', {
    title: 'Restaurant Search',
    text: 'Start typing into the search bar to see your results immediately.',
    attachTo: '.input-container bottom',
    advanceOn: '.docs-link click',
    showCancelLink: true
  });

  tour.addStep('example', {
    title: 'Filters and Sorting',
    text: 'Your search results are filtered and reordered dynamically.',
    attachTo: '.search-nav-section bottom',
    advanceOn: '.docs-link click',
    showCancelLink: true
  });

  tour.addStep('example', {
    title: 'Get exploring NYC!',
    text: 'Explore the map and watch your search results update in real time!',
    attachTo: '.search-index-container right',
    advanceOn: '.docs-link click',
    scrollTo: true,
    showCancelLink: true
  });

  tour.addStep('example', {
    title: 'Sign Up',
    text: 'Create an account, login through Facebook, or take a look at the Demo user!',
    attachTo: '.big-red-button.facebook bottom',
    advanceOn: '.docs-link click',
    showCancelLink: true,
    scrollTo: true
  });

  tour.start();
});
