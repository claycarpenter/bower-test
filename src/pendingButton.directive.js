(function () {
  angular
    .module('mbm.pendingButton')
    .directive('siPendingButton', ['$rootScope', siPendingButton]);

  function siPendingButton($rootScope) {
    return {
      restrict: 'A',
      require: 'siPendingButton',
      scope: {
        isExternalEnabled: '=?siPendingButtonEnabled',
        actionReceiver: '&siPendingButton'
      },
      controller: ['$scope', function($scope) {
        var vm = this,
            registeredTexts = [],
            currentState = 'init';

        vm.registerText = function registerText(pendingButtonTextListener) {
          registeredTexts.push(pendingButtonTextListener);
        };

        vm.updateState = function updateState(newState) {
          currentState = newState;

          notifyStateChange(currentState);
        };

        vm.getState = function getState() {
          return currentState;
        };

        function notifyStateChange(newState) {
          registeredTexts.forEach(function(pendingButtonTextListener) {
            pendingButtonTextListener(newState);
          });
        }
      }],
      link: function ($scope, element, attr, pendingButtonCtrl) {
        var isWaiting = false;

        // If no progress icon is present, add one.
        if (!element.find('.button--progress-icon').length) {
          element.append('<i class="button--progress-icon"></i>');
        }

        if (typeof $scope.isExternalEnabled === 'undefined') {
          // No value provided for external button enabled attribute; assume
          // button is always considered externally enabled.
          $scope.isExternalEnabled = true;
        }

        $scope.isEnabled = function isEnabled() {
          return $scope.isExternalEnabled && !isWaiting;
        }

        $scope.$watch('isEnabled()', function(value) {
          element.toggleClass('disabled', !value);
        });

        element.on('click touchstart', function(event) {
          if (event) { event.preventDefault(); }

          // Do nothing if the button isn't enabled.
          if (!$scope.isEnabled()) { return; }

          // Execute the action, and capture the (expected) returned promise.
          var actionQ = $scope.actionReceiver();

          // Add loading animation.
          element.addClass('loading');

          // Set waiting flag, and apply scope to update isEnabled watch.
          isWaiting = true;
          $scope.$apply();

          pendingButtonCtrl.updateState('wait');

          actionQ
            .then(function() {
              pendingButtonCtrl.updateState('success');
            })
            .catch(function() {
              pendingButtonCtrl.updateState('error');
            })
            .finally(function() {
              // Clear the loading animation and waiting flag.
              isWaiting = false;
              element.removeClass('loading');
            });
        });
      }
    }
  }
})();
