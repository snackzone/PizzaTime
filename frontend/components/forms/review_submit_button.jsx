var React = require('react');

var ReviewSubmitButton = React.createClass({
  render: function () {
    var disabled = (this.props.length < 20 ||
      this.props.length > 300 ||
      !this.props.rated);

    var klass = "big-red-button submit-button submit";
    if (disabled) {
      klass += " disabled";
    }

    return (
      <button
        disabled={disabled}
        className={klass}>
        {this.props.isUpdate ? "Post Update" : "Post Review"}
      </button>
    );
  }

});

module.exports = ReviewSubmitButton;
