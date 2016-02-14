var Shepherd = require('tether-shepherd');

var ShepherdTour = function () {
  var tour = new Shepherd.Tour({
    defaults: {
      classes: 'shepherd-theme-arrows'
    }
  });

  tour.addStep('example', {
    title: 'Welcome to PizzaTime!',
    text: 'PizzaTime is inspired by Yelp. Find your slice in NYC!',
    attachTo: '#logo bottom',
    advanceOn: '.docs-link click',
    scrollTo: true,
    showCancelLink: true
  });

  tour.addStep('example', {
    title: 'Restaurant Search',
    text: 'Start typing into the search bar to see your results in a drop down.',
    attachTo: '.input-container bottom',
    advanceOn: '.docs-link click',
    showCancelLink: true
  });

  tour.addStep('example', {
    title: 'Filters and Sorting',
    text: 'Your search results are filtered and reordered dynamically.',
    attachTo: '.search-nav-section bottom',
    advanceOn: '.docs-link click',
    showCancelLink: true
  });

  tour.addStep('example', {
    title: 'Get exploring NYC!',
    text: 'Explore the map and watch your search results update in real time!',
    attachTo: '.map top',
    advanceOn: '.docs-link click',
    showCancelLink: true
  });

  tour.addStep('example', {
    title: 'Sign Up',
    text: 'Create an account, login through Facebook, or take a look at the Demo user!',
    attachTo: '.big-red-button.facebook bottom',
    advanceOn: '.docs-link click',
    showCancelLink: true
  });

  if (document.cookie.replace(/(?:(?:^|.*;\s*)tourCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
    tour.start();
    document.cookie = "tourCookie=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  }

};

module.exports = ShepherdTour;
