var React = require('react');
var RestaurantActions = require('../../actions/restaurant_actions');

var IndexItem = React.createClass({
  render: function () {
    var klass = "search-index-item";
    if (this.props.restaurant.focused) {
      klass += " focused";
    }

    return(
      <li className={klass}
          id={this.props.restaurant.id}
          onMouseOver={RestaurantActions.focusRestaurant}
          onMouseLeave={RestaurantActions.unfocusAllRestaurants}>
        <img src="#"
             className="restaurant-thumb"/>
        {this.props.restaurant.name}
      </li>
    );
  }
});

// var IndexItem = React.createClass({
//   render: function () {
//     return(
//       <li className="search-index-item"
//           id={this.props.restaurant.id}>
//         {this.props.restaurant.name}
//       </li>
//     );
//   }
// });

module.exports = IndexItem;
