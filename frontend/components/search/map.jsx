var React = require('react');
var FilterActions = require('../../actions/filter_actions');
var RestaurantStore = require('../../stores/restaurant_store');
var RestaurantActions = require('../../actions/restaurant_actions');
var History = require('react-router').History;

var Map = React.createClass({
  mixins: [History],

  getInitialState: function () {
    this.markers = [];
    return null;
  },

  componentDidMount: function () {
    // navigator.geolocation.getCurrentPosition(geoCallback);
    // function geoCallback(data) {
    //
    //
    // }
    this.createMap();
    this.map.addListener('idle', this._idleHandler);
    this.restaurantListenerToken =
      RestaurantStore.addListener(this.reconcileMarkers);
  },

  componentWillUnmount: function () {
    this.restaurantListenerToken.remove();
  },

  createMap: function () {
    var mapDOMNode = this.refs.map;
    var mapOptions = {
      center: {lat: 40.736779, lng: -73.935598},
      zoom: 12
    };
    //google "NYC"
    //40.7058316, -74.2581844
    //van dam st & bradley ave
    //40.736779, -73.935598
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.map.addListener("mouseout", this.closeAllInfoWindows);
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
        marker.setIcon(getIcon(marker.restaurantId, false));
      } else {
        marker.setIcon(getIcon(marker.restaurantId, true));
      }
    });
  },

  createMarkerFromRestaurant: function (restaurant) {
    var pos = new google.maps.LatLng(restaurant.lat, restaurant.lng);

    var mapIcon = getIcon(restaurant.id, restaurant.focused);

    var shape = {
    coords: [1, 1, 1, 36, 30, 36, 30, 1],
    type: 'poly'
    };

    var labelContent = (RestaurantStore.findIndexById(restaurant.id) + 1).toString();

    var contentString = generateContentString(restaurant);

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      restaurantId: restaurant.id
    });

    var marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      restaurantId: restaurant.id,
      icon: mapIcon,
      shape: shape,
      infowindow: infowindow
    });

    // this.addListenersToMarker(marker);
    //Not sure why the above doesnt work when i just copy listeners into function.

    var self = this;
    var infowindowCallback = function () {
      self.closeAllInfoWindows();
      infowindow.open(this.map, marker);
    };

    marker.addListener("mouseover", RestaurantActions.focusRestaurantFromMarker);
    marker.addListener("mouseout", RestaurantActions.unfocusAllRestaurants);
    marker.addListener("click", this.handleMarkerClick);
    marker.addListener("mouseover", infowindowCallback);

    this.markers.push(marker);
  },

  closeAllInfoWindows: function () {
    this.markers.forEach(function(marker) {
      marker.infowindow.close(this.map, marker);
    });
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

  handleMarkerClick: function () {
    var id = RestaurantStore.focusedRestaurants()[0].id;
    this.history.pushState({}, "/restaurants/" + id);
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

var generateContentString = function (restaurant) {
  var htmlString = "<div class='map-detail group'>";
  htmlString += "<img src='" + restaurant.photo_url + "'/>";
  htmlString += "<section>";
  htmlString += "<h1>" + restaurant.name + "</h1>";
  htmlString += "<p>" + restaurant.address + "</p>";
  htmlString += "</section>";
  htmlString += "</div>";
  return htmlString;
};

var getIcon = function (id, focused) {
  var index = RestaurantStore.findIndexById(id);

  var image;

  if (focused) {
    image = window.PizzaTime.imageUrls.mapMarkersBlack[index];
  } else {
    image = window.PizzaTime.imageUrls.mapMarkersRed[index];
  }

  var mapIcon = new google.maps.MarkerImage(image);
  mapIcon.scaledSize = new google.maps.Size(32, 41.333333333);
  mapIcon.anchor = new google.maps.Point(0, 0);

  return mapIcon;
};

module.exports = Map;
