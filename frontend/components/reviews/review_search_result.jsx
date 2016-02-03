var React = require('react');
var ReactRouter = require('react-router');

var ReviewSearchResult = React.createClass({
  render: function () {
    var Link = ReactRouter.Link;
    var result = this.props.result;

    return(
      <li className="group">
        <img className="search-result-thumb" src={result.photo_url}/>
        <Link to={"/restaurants/" + result.id}>{result.name}</Link>
        <img className="stars" src={getStarsUrl(result.mean_rating)} />
        <p>{result.address}</p>
        <p>{getPriceRangeString(result.price_range)}</p>
        <Link to={"/restaurants/" + result.id + "/review"} className="new-review-button">Write a Review</Link>
      </li>
    );
  }
});

function getPriceRangeString (num) {
  var priceRange = "";
  for(var i = 0; i < num; i++) {
    priceRange += "$";
  }
  return priceRange;
}

function getStarsUrl (num) {
  return window.PizzaTime.imageUrls.stars[num - 1];
}

module.exports = ReviewSearchResult;
