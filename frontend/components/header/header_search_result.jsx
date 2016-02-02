var React = require('react');
var FilterActions = require('../../actions/filter_actions');
var ReactRouter = require('react-router');

var HeaderSearchResult = React.createClass({
  render: function () {
    var Link = ReactRouter.Link;
    
    return (
        <li>
          <Link to={ "/restaurants/" + this.props.id }>{this.props.name}</Link>
        </li>
    );
  }
});

module.exports = HeaderSearchResult;
