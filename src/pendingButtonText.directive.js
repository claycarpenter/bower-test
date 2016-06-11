(function () {
  angular
    .module('mbm.pendingButton')
    .directive('siPendingButtonText', ['$rootScope', siPendingButtonText]);

  function siPendingButtonText($rootScope) {
    return {
      restrict: 'EA',
      require: '^siPendingButton',
      scope: {
        statusCategory: '@siPendingButtonText'
      },
      link: function ($scope, element, attr, pendingButtonCtrl) {
        pendingButtonCtrl.registerText(onChangeStatus);

        var states = $scope.statusCategory.split(',').map(function(state) { return state.trim(); });

        function onChangeStatus(newStatus) {
          if (states.indexOf(newStatus) >= 0) {
            element.show();
          } else {
            element.hide();
          }
        }

        onChangeStatus(pendingButtonCtrl.getState());
      }
    }
  }
})();
