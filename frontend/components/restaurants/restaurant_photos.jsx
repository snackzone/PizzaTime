var React = require('react');
var UserUpload = require('./user_upload');

var RestaurantPhotos = React.createClass({
  getInitialState: function () {
    this.array = this.photoArray();
    return {array: this.photoArray()};
  },

  photoArray: function () {
    // debugger
    var array = [<img className="restaurant-photo" src={this.props.profilePhoto} />];
    var uploads = this.props.userUploads.map(function(upload, index) {
      return <UserUpload key={index} upload={upload}/>;
    });
    return array.concat(uploads);
  },

  rotate_right: function () {
    this.array.unshift(this.array.pop());
    this.setState({array: this.array});
  },

  rotate_left: function () {
    this.array.push(this.array.shift());
    this.setState({array: this.array});
  },

  render: function () {
    return (
      <div className="carosel">
        <figure className="restaurant-photo-container group">
          {this.state.array[0]}
        </figure>
        <button onClick={this.rotate_left}>{"<"}</button>
        <button onClick={this.rotate_right}>{">"}</button>
      </div>
    );
  }
});

module.exports = RestaurantPhotos;
