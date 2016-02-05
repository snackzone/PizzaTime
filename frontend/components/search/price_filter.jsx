var React = require('react');
var PriceFilterButton = require('./price_filter_button');
var pricePoints = [
  "inexpensive",
  "moderate",
  "pricey",
  "mama mia!"
];

var PriceFilter = React.createClass({
  getInitialState: function () {
    var filter = this;
    var buttons = pricePoints.map(function(string, idx) {
      return (
        <PriceFilterButton
          num={idx + 1}
          title={string}
          id={idx}
          active={false}
          maxPrice={false}
          key={idx}
          handleClick={filter.handleButtonClick}/>
      );
    });

    return ({buttons: buttons});
  },


  handleButtonClick: function (id, flag) {
    var buttons;
    var filter = this;
    if (flag) {
      buttons = this.emptyButtons();
    } else {
      buttons = pricePoints.map(function(string, idx) {
        var active = idx <= id;
        var maxPrice = idx === id;
        return (
          <PriceFilterButton
            num={idx + 1}
            title={string}
            id={idx}
            active={active}
            key={idx}
            maxPrice={maxPrice}
            handleClick={filter.handleButtonClick}/>
        );
      });
    }
    this.setState({buttons: buttons});
  },

  emptyButtons: function () {
    var filter = this;
    var buttons = pricePoints.map(function(string, idx) {
      return (
        <PriceFilterButton
          num={idx + 1}
          title={string}
          id={idx}
          active={false}
          maxPrice={false}
          key={idx}
          handleClick={filter.handleButtonClick}/>
      );
    });

    return buttons;
  },

  render: function () {


    return(
      <div className="price-filter">
        {this.state.buttons}
      </div>
    );
  }
});

module.exports = PriceFilter;
