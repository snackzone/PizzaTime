var React = require('react');
var UserUpload = require('../restaurants/user_upload');
var UserStore = require('../../stores/user_store');

var UserPhotos = React.createClass({
  render: function () {
    var photos = UserStore.find(this.props.params.id).photos;

    return (
      <div className="user-photo-gallery-container">
        <h2>Photos</h2>
        <ul className="user-photo-gallery group">
          {photos.map(function(photo, index) {
            return(
              <div className="polaroid-wrapper">
                <UserUpload
                  key={index}
                  upload={photo}
                />
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = UserPhotos;
