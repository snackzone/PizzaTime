var React = require('react');
var ReactRouter = require('react-router');


var RestaurantReview = React.createClass({
  render: function () {
    var Link = ReactRouter.Link;
    var review = this.props.review;
    var starsUrl = getStarsUrl(review.rating);
    var author = this.props.review.author;

    return (
      <li className="group">
        <img className="review-thumb" src={author.photo_url}/>
        <div className="review-restaurant-info">
          <Link to={"/users/" + author.id + "/reviews"}>
            {author.firstname} {author.surname.slice(0, 1)}.
          </Link>
        </div>

        <div className="review-rating-container group">
          <img className="stars" src={starsUrl} />
          <p className="review-date">{review.date}</p>
        </div>

        <p className="review-body">{review.body}</p>
      </li>
    );
  }
});

function getStarsUrl (num) {
  return window.PizzaTime.imageUrls.stars[num - 1];
}

module.exports = RestaurantReview;
