var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');

var UserShow = React.createClass({
  render: function () {
    return (
      <section className="user-show-container">
        <h1>Hello, user!</h1>
        <button>FILE UPLOAD</button>
      </section>
    );
  }
});

module.exports = UserShow;
