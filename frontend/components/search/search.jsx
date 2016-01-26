var React = require("react");
var Map = require("./map");
var Index = require("./index");
var RestaurantStore = require("../../stores/restaurant_store");
var ApiUtil = require('../../util/api_util');

var Search = React.createClass({
  getInitialState: function () {
    return {restaurants: RestaurantStore.all()};
  },

  componentDidMount: function () {
    ApiUtil.fetchBenches();
    this.restaurantListenerToken = RestaurantStore.addListener(this._change);
  },

  _change: function () {
    this.setState({restaurants: RestaurantStore.all()});
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
