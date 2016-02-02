var React = require('react');

var RatingSelector = React.createClass({
  getInitialState: function () {
    this.starUnfilledUrl = window.PizzaTime.imageUrls.sprites.star_unfilled;
    this.starFilledUrl = window.PizzaTime.imageUrls.sprites.star_filled;

    var starsArray = [];
    for (var i = 0; i <= this.props.rating; i++) {
      starsArray.push(this.filledStar(i));
    }

    for (i; i < 5; i++) {
      starsArray.push(this.unfilledStar(i));
    }

    return ({
      starsArray: starsArray,
      set: this.props.ratingSet
    });
  },

  filledStar: function (num) {
    return this._star(num, true);
  },

  unfilledStar: function (num) {
    return this._star(num, false);
  },

  _star: function (num, flag) {
    var klass = flag ? "filled-star" : "unfilled-star";
    var url = flag ? this.starFilledUrl : this.starUnfilledUrl;

    return (
      <li
        className="star"
        key={num}
        id={num}
        onMouseEnter={this.handleHover}
        onClick={this.setRating}>
        <img
          className={klass}
          src={url}/>
      </li>
    );
  },

  getUnfilledStars: function () {
    var unfilledStars = [];
    for (var i = 0; i < 5; i++) {
      unfilledStars.push(this.unfilledStar(i));
    }

    this.setState({ starsArray: unfilledStars });
  },

  handleHover: function (e) {
    e.preventDefault();
    var num = e.currentTarget.id;
    this.fillStarsUpto(num);
  },

  revert: function () {
    var num = this.props.rating;
    this.fillStarsUpto(num);
  },

  fillStarsUpto: function (num) {
    var starsArray = [];
    for (var i = 0; i <= num; i++) {
      starsArray.push(this.filledStar(i));
    }

    for (i; i < 5; i++) {
      starsArray.push(this.unfilledStar(i));
    }

    this.setState({ starsArray: starsArray});
  },

  setRating: function (e) {
    e.preventDefault();
    var id = e.currentTarget.id;
    this.props.handleClick(id);
  },

  render: function () {
    return (
      <div
        name="rating-selector"
        id="rating-selector">
        <ul className="rating-selector group"
          onMouseLeave={this.revert}>
          {this.state.starsArray}
        </ul>
      </div>
    );
  }
});

module.exports = RatingSelector;
