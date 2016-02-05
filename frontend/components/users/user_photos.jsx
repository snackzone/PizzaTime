var React = require('react');
var UserUpload = require('../restaurants/user_upload');
var UserStore = require('../../stores/user_store');
var UserApiUtil = require('../../util/user_api_util');

var UserPhotos = React.createClass({
  getInitialState: function () {
    var id = this.props.params.id;
    return ({
      user: UserApiUtil.fetchById(id, this._change),
      loaded: false
    });
  },

  componentDidMount: function () {
    this.userListener =
      UserStore.addListener(this._change);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  _change: function () {
    this.setState({
      user: UserStore.find(this.props.params.id),
      loaded: true
    });
  },

  render: function () {
    if (!this.state.loaded) {
      return (
        <div className="user-photo-gallery-container">
          ...
        </div>
      );
    }


    var photos = this.state.user.photos;

    return (
      <div className="user-photo-gallery-container">
        <h2>Photos</h2>
        <ul className="user-photo-gallery group">
          {photos.map(function(photo, index) {
            return(
              <div
                className="polaroid-wrapper"
                key={index}>
                <UserUpload
                  upload={photo}
                  linkPath={"/restaurants/" + photo.restaurant_id}
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
