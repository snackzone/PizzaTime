var React = require('react');

var UserUpload = React.createClass({
  render: function () {
    var upload = this.props.upload;
    return (
      <li>
        <p className="carousel-caption">{"\""+upload.caption+"\""}</p>
        <img src={upload.url} className="restaurant-photo"/>
      </li>
    );
  }


});

module.exports = UserUpload;
