(function () {
  'use strict';
  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.message="";
    $scope.lunchMenu="";

    $scope.checkAmount = function() {
      var items=$scope.lunchMenu.trim()
      if (items.length == 0) {
        $scope.message = "Please enter data first"
      } else {
        var itemCount= items.split(',').length
        if (itemCount <= 3 ) {
          $scope.message="Enjoy!"
        } else {
          $scope.message="Too much!"
        }
      }
    };
  }
})();
