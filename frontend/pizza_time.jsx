var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var Search = require('./components/search/search');
var RestaurantStore = require('./stores/restaurant_store');
var Header = require('./components/header/header');
var SessionForm = require('./components/forms/session_form');
var UserForm = require('./components/forms/user_form');
var UserShow = require('./components/users/show');

var App = React.createClass({
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
    <Route path="users/:id" component={UserShow}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<ReactRouter>{routes}</ReactRouter>, document.getElementById("content"));
});
