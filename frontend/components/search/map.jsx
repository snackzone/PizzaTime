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

    var image = window.PizzaTime.imageUrls.mapMarker;

    var shape = {
    coords: [1, 1, 1, 36, 30, 36, 30, 1],
    type: 'poly'
    };

    var contentString = generateContentString(restaurant);
    console.log(contentString);
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      restaurantId: restaurant.id,
      animation: google.maps.Animation.DROP,
      icon: image,
      shape: shape,
      infowindow: infowindow
    });

    marker.addListener("mouseover", RestaurantActions.focusRestaurantFromMarker);
    marker.addListener("mouseout", RestaurantActions.unfocusAllRestaurants);

    var self = this;
    marker.addListener("click", function () {
      self.closeAllInfoWindows();
      infowindow.open(this.map, marker);
    });

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
  var htmlString = "<div class='map-detail'>";
  htmlString += "<h1>" + restaurant.name + "</h1>";
  htmlString += "<p>" + restaurant.address + "</p>";
  htmlString += "<a href=" + restaurant.url + ">" + "Link" + "</a>";
  htmlString += "</div>";
  return htmlString;
};

// function setMarkers(map) {
//   // Adds markers to the map.
//
//   // Marker sizes are expressed as a Size of X,Y where the origin of the image
//   // (0,0) is located in the top left of the image.
//
//   // Origins, anchor positions and coordinates of the marker increase in the X
//   // direction to the right and in the Y direction down.
//   var image = {
//     url: 'images/beachflag.png',
//     // This marker is 20 pixels wide by 32 pixels high.
//     size: new google.maps.Size(20, 32),
//     // The origin for this image is (0, 0).
//     origin: new google.maps.Point(0, 0),
//     // The anchor for this image is the base of the flagpole at (0, 32).
//     anchor: new google.maps.Point(0, 32)
//   };
//   // Shapes define the clickable region of the icon. The type defines an HTML
//   // <area> element 'poly' which traces out a polygon as a series of X,Y points.
//   // The final coordinate closes the poly by connecting to the first coordinate.
//   var shape = {
//     coords: [1, 1, 1, 20, 18, 20, 18, 1],
//     type: 'poly'
//   };
//   for (var i = 0; i < beaches.length; i++) {
//     var beach = beaches[i];
//     var marker = new google.maps.Marker({
//       position: {lat: beach[1], lng: beach[2]},
//       map: map,
//       icon: image,
//       shape: shape,
//       title: beach[0],
//       zIndex: beach[3]
//     });
//   }
// }

module.exports = Map;
