var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var ReviewButton = React.createClass({
  render: function () {
    var content = this.props.isUpdate ? "Update Your Review" : "Write a Review";
    var klass = this.props.isUpdate ? " update" : " new";

    return(
      <Link
        to={"/restaurants/" + this.props.restaurant.id + "/review"}
        className={"review-button" + klass}>
        {content}
      </Link>
    );
  }
});

module.exports = ReviewButton;
