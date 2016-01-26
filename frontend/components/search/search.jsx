var React = require("react");
var Map = require("./map");
var Index = require("./index");
var RestaurantStore = require("../../stores/restaurant_store");
var FilterStore = require("../../stores/filter_store");
var ApiUtil = require('../../util/api_util');
var ApiActions = require('../../actions/api_actions');

var Search = React.createClass({
  getInitialState: function () {
    return(
      {
        restaurants: RestaurantStore.all(),
        filters: FilterStore.all()
      }
    );
  },

  componentDidMount: function () {
    ApiUtil.fetchRestaurants(FilterStore.all());
    this.restaurantListenerToken =
      RestaurantStore.addListener(this._changeRestaurants);
    this.filterListenerToken =
      FilterStore.addListener(this._changeFilters);
  },

  _changeRestaurants: function () {
    this.setState({restaurants: RestaurantStore.all()});
  },

  _changeFilters: function () {
    this.setState({filters: FilterStore.all()});
    ApiUtil.fetchRestaurants(FilterStore.all());
  },

  render: function () {
    return (
      <div className="Search">
        <Index restaurants={this.state.restaurants}/>
        <Map/>
      </div>
    );
  }
});

module.exports = Search;
