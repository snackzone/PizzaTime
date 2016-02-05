var React = require('react');

var FortuneCookie = React.createClass({

  render: function () {
    return (
      <div className="fortune-cookie">
        <p>"{this.props.cookie.quote}"</p>
        <p>-{this.props.cookie.author}</p>
      </div>
    );
  }
});

module.exports = FortuneCookie;
