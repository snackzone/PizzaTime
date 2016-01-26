var React = require('react');

var Map = React.createClass({
  componentDidMount: function () {
    this._createMap();
  },

  _createMap: function () {
    var mapDOMNode = this.refs.map;
    var mapOptions = {
      center: {lat: 40.7058316, lng: -74.2581844},
      zoom: 10
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
  },

  render: function () {
    return (
      <div className="map"
           ref="map">
      </div>
    );
  }
});

module.exports = Map;
