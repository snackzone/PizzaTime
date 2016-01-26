var React = require("react");
var Map = require("./map");

var Search = React.createClass({
  render: function () {
    return (
      <div className="Search">
        <Map/>
      </div>
    );
  }
});

module.exports = Search;
