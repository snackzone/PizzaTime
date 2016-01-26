var React = require('react');
var ApiUtil = require('../../util/api_util');
var FilterActions = require('../../actions/filter_actions');

var Map = React.createClass({
  getInitialState: function () {
    this.mapMarkers = [];
    return null;
  },

  componentDidMount: function () {
    this._createMap();
    this.map.addListener('idle', this._idleHandler);
  },

  _createMap: function () {
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

  _destroyAllMapMarkers: function () {
    for(var i = 0; i < this.mapMarkers.length; i++) {
      this.mapMarkers[i].setMap(null);
    }
    this.mapMarkers = [];
  },

  _reconcileMapMarkers: function () {
    var marker;

    this._destroyAllMapMarkers();
    this.props.restaurants.forEach(function(restaurant) {
      marker = new google.maps.Marker({
        position: {
          lat: restaurant.lat,
          lng: restaurant.lng
        },
        map: this.map
      });

      this.mapMarkers.push(marker);
    }.bind(this));
  },

  _updateBounds: function () {
    var bounds = this.map.getBounds();
    this.bounds = _formatBounds(bounds);
  },

  render: function () {
    this._reconcileMapMarkers();

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
