var React = require('react');
var Link = require('react-router').Link;

var UserUpload = React.createClass({
  render: function () {
    var upload = this.props.upload;

    return (
      <Link className="user-upload" to={this.props.linkPath}>
        {upload.caption ? <p className="upload-caption">{"\""+upload.caption+"\""}</p> : null}
        <img src={upload.url} className="restaurant-photo"/>
      </Link>
    );
  }


});

module.exports = UserUpload;
