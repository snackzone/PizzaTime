var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var LoggedInDropdown = require('./logged_in_dropdown');


var LoggedIn = React.createClass({
  mixins: [require('react-onclickoutside')],

  getInitialState: function () {
    return {focused: false};
  },

  componentWillReceiveProps: function () {
    this.setState({focused: false});
  },

  dropdownToggle: function (e) {
    e.preventDefault();
    this.setState({focused: !this.state.focused});
  },

  handleClickOutside: function (e) {
    if (this.state.focused) {
      this.setState({focused: false});
    }
  },

  render: function () {
    var currentUser = CurrentUserStore.currentUser();

    return (
      <div className="logged-in-dropdown-container">
        <div className="logged-in group" onClick={this.dropdownToggle}>
          <img className="avatar-thumb" src={currentUser.photo_url}/>
          <img className="logged-in-dropdown-arrow" src={window.PizzaTime.imageUrls.sprites.dropdown}/>
        </div>
        {this.state.focused ? <LoggedInDropdown user={currentUser}/> : null}
      </div>
    );
  }
});


module.exports = LoggedIn;
