var React = require('react');
var ApiUtil = require('../../util/api_util');
var FilterActions = require('../../actions/filter_actions');
var RestaurantStore = require('../../stores/restaurant_store');
var RestaurantActions = require('../../actions/restaurant_actions');

var Map = React.createClass({
  getInitialState: function () {
    this.markers = [];
    return null;
  },

  componentDidMount: function () {
    this.createMap();
    this.map.addListener('idle', this._idleHandler);
    this.restaurantListenerToken =
      RestaurantStore.addListener(this.reconcileMarkers);
  },

  createMap: function () {
    var mapDOMNode = this.refs.map;
    var mapOptions = {
      center: {lat: 40.7058316, lng: -74.2581844},
      zoom: 10
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
  },

  _idleHandler: function () {
    this._updateBounds();
    FilterActions.receiveFilter(this.bounds);
  },

  _destroyAllmarkers: function () {
    for(var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  },

  reconcileMarkers: function () {
    var restaurants = RestaurantStore.all();
    var toAdd = [], toRemove = this.markers.slice();
    restaurants.forEach(function(restaurant, idx){
      idx = -1;
      for(var i = 0; i < toRemove.length; i++){
        if(toRemove[i].restaurantId == restaurant.id){
          idx = i;
          break;
        }
      }
      if(idx === -1){
        toAdd.push(restaurant);
      } else {
        toRemove.splice(idx, 1);
      }
    });

    toAdd.forEach(this.createMarkerFromRestaurant);
    toRemove.forEach(this.removeMarker);
    this.updateFocus();
  },

  updateFocus: function() {
    var focusedRestaurantIds =
      RestaurantStore.focusedRestaurants().map(function (restaurant) {
        return restaurant.id;
    });

    this.markers.forEach(function(marker) {
      if (focusedRestaurantIds.indexOf(marker.restaurantId) === -1) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  },

  createMarkerFromRestaurant: function (restaurant) {
    var pos = new google.maps.LatLng(restaurant.lat, restaurant.lng);
    var marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      restaurantId: restaurant.id,
      animation: google.maps.Animation.DROP
    });
    marker.addListener("mouseover", RestaurantActions.focusRestaurantFromMarker);
    marker.addListener("mouseout", RestaurantActions.unfocusAllRestaurants);
    console.log('made a marker.');
    this.markers.push(marker);
  },

  removeMarker: function(marker){
    for(var i = 0; i < this.markers.length; i++){
      if (this.markers[i].restaurantId === marker.restaurantId){
        this.markers[i].setMap(null);
        this.markers.splice(i, 1);
        break;
      }
    }
  },

  _updateBounds: function () {
    var bounds = this.map.getBounds();
    this.bounds = _formatBounds(bounds);
  },

  render: function () {
    return (
      <div className="map"
           ref="map">
      </div>
    );
  }
});

var _formatBounds = function (bounds) {
  var northEast = bounds.getNorthEast();
  var southWest = bounds.getSouthWest();
  return (
    {
      bounds: {
        northEast: {
          lat: northEast.lat(),
          lng: northEast.lng()
        },
        southWest: {
          lat: southWest.lat(),
          lng: southWest.lng()
        }
      }
    }
  );
};

module.exports = Map;
