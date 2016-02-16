var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var PhotoDeleteButton = require('./photo_delete_button');
var UserUpload = require('../restaurants/user_upload');
var UserStore = require('../../stores/user_store');
var UserApiUtil = require('../../util/user_api_util');
var Link = require('react-router').Link;


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

  componentWillReceiveProps: function(nextProps) {
    var id = parseInt(nextProps.params.id);
    this.setState({
      user: UserStore.find(id),
      loaded: true
    });
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
                className="photo-plus-description group"
                key={index}>
                <div
                  className="polaroid-wrapper">
                  <UserUpload
                    upload={photo}
                    linkPath={"/restaurants/" + photo.restaurant_id}
                  />
                  {CurrentUserStore.isCurrentUser(photo.user_id) ?
                    <PhotoDeleteButton photo={photo}/> : null}
                </div>
                <p className="user-photo-link">
                  <Link
                    to={"/restaurants/" + photo.restaurant_id}>
                    {photo.restaurant_name}
                  </Link> - {photo.date}
                </p>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = UserPhotos;
