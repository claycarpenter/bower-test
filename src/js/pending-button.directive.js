
export function mbmPendingButton() {
  return {
    restrict: 'A',
    require: 'mbmPendingButton',
    scope: {
      actionReceiver: '&mbmPendingButton',
      isExternalEnabled: '=?pendingButtonEnabled',
      waitingClass: '@?pendingButtonWaitingClass',
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

      // Start with the default waiting class
      var waitingClass = 'mbm-pending-button--waiting';

      if (typeof $scope.waitingClass === 'string') {
        // Override the default if a custom waiting class has been provided.
        waitingClass = $scope.waitingClass;
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

        // Add waiting style.
        element.addClass(waitingClass);

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
            // Clear the waiting style and flag.
            isWaiting = false;
            element.removeClass(waitingClass);
          });
      });
    }
  }
}
