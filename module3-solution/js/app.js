(function () {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'founditems.template.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundItems',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var foundItems = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDown=this;

  narrowItDown.search = function () {
    narrowItDown.found = MenuSearchService.getMenuItems(narrowItDown.searchTerm);
  };

  narrowItDown.removeItem = function (itemIndex) {
    narrowItDown.found.splice(itemIndex, 1);
  };

}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMenuItems = function(searchTerm){
    var foundItems=[];
    var promise = $http({url: ApiBasePath});
    if (searchTerm && searchTerm.length > 0) {
      promise.then(function (response) {
        var item;
        for (item in response.data.menu_items) {
          if (response.data.menu_items[item].description.toLowerCase().search(searchTerm.toLowerCase()) >= 0) {
            foundItems.push(response.data.menu_items[item]);
          };
        };
      });
    }
    return foundItems;
  };
}

})();
