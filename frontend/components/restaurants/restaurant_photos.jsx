var React = require('react');
var UserUpload = require('./user_upload');

var RestaurantPhotos = React.createClass({
  getInitialState: function () {
    this.array = getPhotoArray(this.props.profilePhoto, this.props.userUploads);
    return {array: this.array};
  },

  componentWillReceiveProps: function (newProps) {
    this.array = getPhotoArray(newProps.profilePhoto, newProps.userUploads);
    this.setState({array: this.array});
  },

  rotate_left: function () {
    this.array.unshift(this.array.pop());
    this.setState({array: this.array});
  },

  rotate_right: function () {
    this.array.push(this.array.shift());
    this.setState({array: this.array});
  },

  render: function () {
    return (
      <div className="carousel-wrapper">
        <div className="carousel group">
          <div className="carousel-arrow left" onClick={this.rotate_left}></div>
          <ul className="restaurant-photo-wrapper">
            {this.state.array[0]}
          </ul>
          <div className="carousel-arrow right" onClick={this.rotate_right}></div>
        </div>
      </div>
    );
  }
});

function getPhotoArray (profilePhoto, userUploads) {
  var ad = <img src={window.PizzaTime.imageUrls.sprites.ad}/>;
  var array = [
    <li>
      <img
        className="restaurant-photo"
        src={profilePhoto} />
    </li>
  ];
  var uploads = userUploads.map(function(upload, index) {
    return <UserUpload key={index} upload={upload} linkPath={"/users/" + upload.user_id}/>;
  });
  return array.concat(uploads).concat(ad);
}

module.exports = RestaurantPhotos;
