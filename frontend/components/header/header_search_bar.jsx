var React = require('react');

var HeaderSearchBar = React.createClass({
  render: function () {
    return(
      <div className="header-search-bar">

        <div className="input-container group">
          <h2 className="find">Find</h2>
          <input className="header-search-input" type="text" placeholder="pizza, pizza, pizza"/>
        </div>

      </div>
    );
  }
});

module.exports = HeaderSearchBar;
