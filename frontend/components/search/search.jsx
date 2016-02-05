var React = require("react");
var Map = require("./map");
var Index = require("./index");
var RestaurantStore = require("../../stores/restaurant_store");
var FilterStore = require("../../stores/filter_store");
var RestaurantApiUtil = require('../../util/restaurant_api_util');
var SearchNav = require('./search_nav');

var Search = React.createClass({
  getInitialState: function () {
    window.scrollTo(0, 0);
    return(
      {
        restaurants: RestaurantStore.all(),
        filters: FilterStore.all()
      }
    );
  },

  componentDidMount: function () {
    RestaurantApiUtil.fetchRestaurants(FilterStore.all());
    this.restaurantListenerToken =
      RestaurantStore.addListener(this._changeRestaurants);
    this.filterListenerToken =
      FilterStore.addListener(this._changeFilters);
  },

  componentWillUnmount: function () {
    this.restaurantListenerToken.remove();
    this.filterListenerToken.remove();
  },

  _changeRestaurants: function () {
    this.setState({restaurants: RestaurantStore.all()});
  },

  _changeFilters: function () {
    this.setState({filters: FilterStore.all()});
    RestaurantApiUtil.fetchRestaurants(FilterStore.all());
  },

  render: function () {
    return (
      <section className="search-section">
        <SearchNav/>
        <div className="search-container">
          <div className="search group">
            <Index restaurants={this.state.restaurants}/>
            <Map restaurants={this.state.restaurants}/>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Search;
