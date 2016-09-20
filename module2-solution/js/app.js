(function () {
'use strict';
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyListController', ToBuyListController)
.controller('BoughtListController', BoughtListController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyListController.$inject = ['ShoppingListCheckOffService'];
function ToBuyListController(ShoppingListCheckOffService) {
  var toBuyList=this;

  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };

}

BoughtListController.$inject = ['ShoppingListCheckOffService'];
function BoughtListController(ShoppingListCheckOffService) {
  var boughtList=this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [];
  var boughtItems = [];

  service.addToBuyItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity,
    };
    toBuyItems.push(item);
  };

  service.addToBuyItem("Lettuce", 1)
  service.addToBuyItem("Cheese", 1)
  service.addToBuyItem("Bread", 2)
  service.addToBuyItem("Ham", 10)
  service.addToBuyItem("Oreos", 1000)


  service.buyItem = function (itemIndex) {
    var item=toBuyItems[itemIndex];
    boughtItems.push(item);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
