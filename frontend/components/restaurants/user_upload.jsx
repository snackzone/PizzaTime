var React = require('react');

var UserUpload = React.createClass({
  render: function () {
    var upload = this.props.upload;
    return (
      <li className="group">
        <img src={upload.url} className="restaurant-photo"/>
        <p>{"\""+upload.caption+"\""}</p>
      </li>
    );
  }


});

module.exports = UserUpload;
