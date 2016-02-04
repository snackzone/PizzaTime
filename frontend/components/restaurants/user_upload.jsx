var React = require('react');

var UserUpload = React.createClass({
  render: function () {
    var upload = this.props.upload;

    return (
      <li>
        {upload.caption ? <p className="upload-caption">{"\""+upload.caption+"\""}</p> : null}
        <img src={upload.url} className="restaurant-photo"/>
      </li>
    );
  }


});

module.exports = UserUpload;
