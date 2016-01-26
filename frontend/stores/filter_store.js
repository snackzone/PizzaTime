var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var FilterConstants = require('../constants/filter_constants');

var _filters = {};
var FilterStore = new Store(AppDispatcher);

FilterStore.all = function () {
  return $.extend({}, _filters);
};

FilterStore.updateFilter = function(filter) {
  Object.keys(filter).forEach(function(key) {
    _filters[key] = filter[key];
  });
};

FilterStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case FilterConstants.UPDATE_FILTER:
    FilterStore.updateFilter(payload.filter);
    FilterStore.__emitChange();
    break;
  }
};

module.exports = FilterStore;
