(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mbmPendingButtonText = mbmPendingButtonText;
function mbmPendingButtonText() {
  return {
    restrict: 'EA',
    require: '^mbmPendingButton',
    scope: {
      statusCategory: '@pendingButtonText'
    },
    link: function link($scope, element, attr, pendingButtonCtrl) {
      pendingButtonCtrl.registerText(onChangeStatus);

      var states = $scope.statusCategory.split(',').map(function (state) {
        return state.trim();
      });

      function onChangeStatus(newStatus) {
        if (states.indexOf(newStatus) >= 0) {
          element.show();
        } else {
          element.hide();
        }
      }

      onChangeStatus(pendingButtonCtrl.getState());
    }
  };
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mbmPendingButton = mbmPendingButton;
function mbmPendingButton() {
  return {
    restrict: 'A',
    require: 'mbmPendingButton',
    scope: {
      isExternalEnabled: '=?pendingButtonEnabled',
      actionReceiver: '&pendingButton'
    },
    controller: ['$scope', function ($scope) {
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
        registeredTexts.forEach(function (pendingButtonTextListener) {
          pendingButtonTextListener(newState);
        });
      }
    }],
    link: function link($scope, element, attr, pendingButtonCtrl) {
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
      };

      $scope.$watch('isEnabled()', function (value) {
        element.toggleClass('disabled', !value);
      });

      element.on('click touchstart', function (event) {
        if (event) {
          event.preventDefault();
        }

        // Do nothing if the button isn't enabled.
        if (!$scope.isEnabled()) {
          return;
        }

        // Execute the action, and capture the (expected) returned promise.
        var actionQ = $scope.actionReceiver();

        // Add loading animation.
        element.addClass('loading');

        // Set waiting flag, and apply scope to update isEnabled watch.
        isWaiting = true;
        $scope.$apply();

        pendingButtonCtrl.updateState('wait');

        actionQ.then(function () {
          pendingButtonCtrl.updateState('success');
        }).catch(function () {
          pendingButtonCtrl.updateState('error');
        }).finally(function () {
          // Clear the loading animation and waiting flag.
          isWaiting = false;
          element.removeClass('loading');
        });
      });
    }
  };
}

},{}],3:[function(require,module,exports){
'use strict';

var _pendingButton = require('./pending-button.directive');

var _pendingButtonText = require('./pending-button-text.directive');

(function () {
  angular.module('mbm.pendingButton', []).directive('mbmPendingButton', _pendingButton.mbmPendingButton).directive('mbmPendingButtonText', _pendingButtonText.mbmPendingButtonText);
})();

},{"./pending-button-text.directive":1,"./pending-button.directive":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvcGVuZGluZy1idXR0b24tdGV4dC5kaXJlY3RpdmUuanMiLCJzcmMvanMvcGVuZGluZy1idXR0b24uZGlyZWN0aXZlLmpzIiwic3JjL2pzL3BlbmRpbmctYnV0dG9uLm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDQ2dCLG9CLEdBQUEsb0I7QUFBVCxTQUFTLG9CQUFULEdBQWdDO0FBQ3JDLFNBQU87QUFDTCxjQUFVLElBREw7QUFFTCxhQUFTLG1CQUZKO0FBR0wsV0FBTztBQUNMLHNCQUFnQjtBQURYLEtBSEY7QUFNTCxVQUFNLGNBQVUsTUFBVixFQUFrQixPQUFsQixFQUEyQixJQUEzQixFQUFpQyxpQkFBakMsRUFBb0Q7QUFDeEQsd0JBQWtCLFlBQWxCLENBQStCLGNBQS9COztBQUVBLFVBQUksU0FBUyxPQUFPLGNBQVAsQ0FBc0IsS0FBdEIsQ0FBNEIsR0FBNUIsRUFBaUMsR0FBakMsQ0FBcUMsVUFBUyxLQUFULEVBQWdCO0FBQUUsZUFBTyxNQUFNLElBQU4sRUFBUDtBQUFzQixPQUE3RSxDQUFiOztBQUVBLGVBQVMsY0FBVCxDQUF3QixTQUF4QixFQUFtQztBQUNqQyxZQUFJLE9BQU8sT0FBUCxDQUFlLFNBQWYsS0FBNkIsQ0FBakMsRUFBb0M7QUFDbEMsa0JBQVEsSUFBUjtBQUNELFNBRkQsTUFFTztBQUNMLGtCQUFRLElBQVI7QUFDRDtBQUNGOztBQUVELHFCQUFlLGtCQUFrQixRQUFsQixFQUFmO0FBQ0Q7QUFwQkksR0FBUDtBQXNCRDs7Ozs7Ozs7UUN2QmUsZ0IsR0FBQSxnQjtBQUFULFNBQVMsZ0JBQVQsR0FBNEI7QUFDakMsU0FBTztBQUNMLGNBQVUsR0FETDtBQUVMLGFBQVMsa0JBRko7QUFHTCxXQUFPO0FBQ0wseUJBQW1CLHdCQURkO0FBRUwsc0JBQWdCO0FBRlgsS0FIRjtBQU9MLGdCQUFZLENBQUMsUUFBRCxFQUFXLFVBQVMsTUFBVCxFQUFpQjtBQUN0QyxVQUFJLEtBQUssSUFBVDtVQUNJLGtCQUFrQixFQUR0QjtVQUVJLGVBQWUsTUFGbkI7O0FBSUEsU0FBRyxZQUFILEdBQWtCLFNBQVMsWUFBVCxDQUFzQix5QkFBdEIsRUFBaUQ7QUFDakUsd0JBQWdCLElBQWhCLENBQXFCLHlCQUFyQjtBQUNELE9BRkQ7O0FBSUEsU0FBRyxXQUFILEdBQWlCLFNBQVMsV0FBVCxDQUFxQixRQUFyQixFQUErQjtBQUM5Qyx1QkFBZSxRQUFmOztBQUVBLDBCQUFrQixZQUFsQjtBQUNELE9BSkQ7O0FBTUEsU0FBRyxRQUFILEdBQWMsU0FBUyxRQUFULEdBQW9CO0FBQ2hDLGVBQU8sWUFBUDtBQUNELE9BRkQ7O0FBSUEsZUFBUyxpQkFBVCxDQUEyQixRQUEzQixFQUFxQztBQUNuQyx3QkFBZ0IsT0FBaEIsQ0FBd0IsVUFBUyx5QkFBVCxFQUFvQztBQUMxRCxvQ0FBMEIsUUFBMUI7QUFDRCxTQUZEO0FBR0Q7QUFDRixLQXhCVyxDQVBQO0FBZ0NMLFVBQU0sY0FBVSxNQUFWLEVBQWtCLE9BQWxCLEVBQTJCLElBQTNCLEVBQWlDLGlCQUFqQyxFQUFvRDtBQUN4RCxVQUFJLFlBQVksS0FBaEI7OztBQUdBLFVBQUksQ0FBQyxRQUFRLElBQVIsQ0FBYSx3QkFBYixFQUF1QyxNQUE1QyxFQUFvRDtBQUNsRCxnQkFBUSxNQUFSLENBQWUsdUNBQWY7QUFDRDs7QUFFRCxVQUFJLE9BQU8sT0FBTyxpQkFBZCxLQUFvQyxXQUF4QyxFQUFxRDs7O0FBR25ELGVBQU8saUJBQVAsR0FBMkIsSUFBM0I7QUFDRDs7QUFFRCxhQUFPLFNBQVAsR0FBbUIsU0FBUyxTQUFULEdBQXFCO0FBQ3RDLGVBQU8sT0FBTyxpQkFBUCxJQUE0QixDQUFDLFNBQXBDO0FBQ0QsT0FGRDs7QUFJQSxhQUFPLE1BQVAsQ0FBYyxhQUFkLEVBQTZCLFVBQVMsS0FBVCxFQUFnQjtBQUMzQyxnQkFBUSxXQUFSLENBQW9CLFVBQXBCLEVBQWdDLENBQUMsS0FBakM7QUFDRCxPQUZEOztBQUlBLGNBQVEsRUFBUixDQUFXLGtCQUFYLEVBQStCLFVBQVMsS0FBVCxFQUFnQjtBQUM3QyxZQUFJLEtBQUosRUFBVztBQUFFLGdCQUFNLGNBQU47QUFBeUI7OztBQUd0QyxZQUFJLENBQUMsT0FBTyxTQUFQLEVBQUwsRUFBeUI7QUFBRTtBQUFTOzs7QUFHcEMsWUFBSSxVQUFVLE9BQU8sY0FBUCxFQUFkOzs7QUFHQSxnQkFBUSxRQUFSLENBQWlCLFNBQWpCOzs7QUFHQSxvQkFBWSxJQUFaO0FBQ0EsZUFBTyxNQUFQOztBQUVBLDBCQUFrQixXQUFsQixDQUE4QixNQUE5Qjs7QUFFQSxnQkFDRyxJQURILENBQ1EsWUFBVztBQUNmLDRCQUFrQixXQUFsQixDQUE4QixTQUE5QjtBQUNELFNBSEgsRUFJRyxLQUpILENBSVMsWUFBVztBQUNoQiw0QkFBa0IsV0FBbEIsQ0FBOEIsT0FBOUI7QUFDRCxTQU5ILEVBT0csT0FQSCxDQU9XLFlBQVc7O0FBRWxCLHNCQUFZLEtBQVo7QUFDQSxrQkFBUSxXQUFSLENBQW9CLFNBQXBCO0FBQ0QsU0FYSDtBQVlELE9BOUJEO0FBK0JEO0FBckZJLEdBQVA7QUF1RkQ7Ozs7O0FDekZEOztBQUNBOztBQUdBLENBQUMsWUFBWTtBQUNYLFVBQVEsTUFBUixDQUFlLG1CQUFmLEVBQW9DLEVBQXBDLEVBQ0csU0FESCxDQUNhLGtCQURiLG1DQUVHLFNBRkgsQ0FFYSxzQkFGYjtBQUdELENBSkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5leHBvcnQgZnVuY3Rpb24gbWJtUGVuZGluZ0J1dHRvblRleHQoKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFQScsXG4gICAgcmVxdWlyZTogJ15tYm1QZW5kaW5nQnV0dG9uJyxcbiAgICBzY29wZToge1xuICAgICAgc3RhdHVzQ2F0ZWdvcnk6ICdAcGVuZGluZ0J1dHRvblRleHQnXG4gICAgfSxcbiAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlLCBlbGVtZW50LCBhdHRyLCBwZW5kaW5nQnV0dG9uQ3RybCkge1xuICAgICAgcGVuZGluZ0J1dHRvbkN0cmwucmVnaXN0ZXJUZXh0KG9uQ2hhbmdlU3RhdHVzKTtcblxuICAgICAgdmFyIHN0YXRlcyA9ICRzY29wZS5zdGF0dXNDYXRlZ29yeS5zcGxpdCgnLCcpLm1hcChmdW5jdGlvbihzdGF0ZSkgeyByZXR1cm4gc3RhdGUudHJpbSgpOyB9KTtcblxuICAgICAgZnVuY3Rpb24gb25DaGFuZ2VTdGF0dXMobmV3U3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0ZXMuaW5kZXhPZihuZXdTdGF0dXMpID49IDApIHtcbiAgICAgICAgICBlbGVtZW50LnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtZW50LmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbkNoYW5nZVN0YXR1cyhwZW5kaW5nQnV0dG9uQ3RybC5nZXRTdGF0ZSgpKTtcbiAgICB9XG4gIH07XG59XG4iLCJcbmV4cG9ydCBmdW5jdGlvbiBtYm1QZW5kaW5nQnV0dG9uKCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgcmVxdWlyZTogJ21ibVBlbmRpbmdCdXR0b24nLFxuICAgIHNjb3BlOiB7XG4gICAgICBpc0V4dGVybmFsRW5hYmxlZDogJz0/cGVuZGluZ0J1dHRvbkVuYWJsZWQnLFxuICAgICAgYWN0aW9uUmVjZWl2ZXI6ICcmcGVuZGluZ0J1dHRvbidcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzLFxuICAgICAgICAgIHJlZ2lzdGVyZWRUZXh0cyA9IFtdLFxuICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9ICdpbml0JztcblxuICAgICAgdm0ucmVnaXN0ZXJUZXh0ID0gZnVuY3Rpb24gcmVnaXN0ZXJUZXh0KHBlbmRpbmdCdXR0b25UZXh0TGlzdGVuZXIpIHtcbiAgICAgICAgcmVnaXN0ZXJlZFRleHRzLnB1c2gocGVuZGluZ0J1dHRvblRleHRMaXN0ZW5lcik7XG4gICAgICB9O1xuXG4gICAgICB2bS51cGRhdGVTdGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZVN0YXRlKG5ld1N0YXRlKSB7XG4gICAgICAgIGN1cnJlbnRTdGF0ZSA9IG5ld1N0YXRlO1xuXG4gICAgICAgIG5vdGlmeVN0YXRlQ2hhbmdlKGN1cnJlbnRTdGF0ZSk7XG4gICAgICB9O1xuXG4gICAgICB2bS5nZXRTdGF0ZSA9IGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gbm90aWZ5U3RhdGVDaGFuZ2UobmV3U3RhdGUpIHtcbiAgICAgICAgcmVnaXN0ZXJlZFRleHRzLmZvckVhY2goZnVuY3Rpb24ocGVuZGluZ0J1dHRvblRleHRMaXN0ZW5lcikge1xuICAgICAgICAgIHBlbmRpbmdCdXR0b25UZXh0TGlzdGVuZXIobmV3U3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XSxcbiAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlLCBlbGVtZW50LCBhdHRyLCBwZW5kaW5nQnV0dG9uQ3RybCkge1xuICAgICAgdmFyIGlzV2FpdGluZyA9IGZhbHNlO1xuXG4gICAgICAvLyBJZiBubyBwcm9ncmVzcyBpY29uIGlzIHByZXNlbnQsIGFkZCBvbmUuXG4gICAgICBpZiAoIWVsZW1lbnQuZmluZCgnLmJ1dHRvbi0tcHJvZ3Jlc3MtaWNvbicpLmxlbmd0aCkge1xuICAgICAgICBlbGVtZW50LmFwcGVuZCgnPGkgY2xhc3M9XCJidXR0b24tLXByb2dyZXNzLWljb25cIj48L2k+Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgJHNjb3BlLmlzRXh0ZXJuYWxFbmFibGVkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBObyB2YWx1ZSBwcm92aWRlZCBmb3IgZXh0ZXJuYWwgYnV0dG9uIGVuYWJsZWQgYXR0cmlidXRlOyBhc3N1bWVcbiAgICAgICAgLy8gYnV0dG9uIGlzIGFsd2F5cyBjb25zaWRlcmVkIGV4dGVybmFsbHkgZW5hYmxlZC5cbiAgICAgICAgJHNjb3BlLmlzRXh0ZXJuYWxFbmFibGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLmlzRW5hYmxlZCA9IGZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuICRzY29wZS5pc0V4dGVybmFsRW5hYmxlZCAmJiAhaXNXYWl0aW5nO1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUuJHdhdGNoKCdpc0VuYWJsZWQoKScsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ2Rpc2FibGVkJywgIXZhbHVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBlbGVtZW50Lm9uKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50KSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH1cblxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZSBidXR0b24gaXNuJ3QgZW5hYmxlZC5cbiAgICAgICAgaWYgKCEkc2NvcGUuaXNFbmFibGVkKCkpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gRXhlY3V0ZSB0aGUgYWN0aW9uLCBhbmQgY2FwdHVyZSB0aGUgKGV4cGVjdGVkKSByZXR1cm5lZCBwcm9taXNlLlxuICAgICAgICB2YXIgYWN0aW9uUSA9ICRzY29wZS5hY3Rpb25SZWNlaXZlcigpO1xuXG4gICAgICAgIC8vIEFkZCBsb2FkaW5nIGFuaW1hdGlvbi5cbiAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnbG9hZGluZycpO1xuXG4gICAgICAgIC8vIFNldCB3YWl0aW5nIGZsYWcsIGFuZCBhcHBseSBzY29wZSB0byB1cGRhdGUgaXNFbmFibGVkIHdhdGNoLlxuICAgICAgICBpc1dhaXRpbmcgPSB0cnVlO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgcGVuZGluZ0J1dHRvbkN0cmwudXBkYXRlU3RhdGUoJ3dhaXQnKTtcblxuICAgICAgICBhY3Rpb25RXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwZW5kaW5nQnV0dG9uQ3RybC51cGRhdGVTdGF0ZSgnc3VjY2VzcycpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGVuZGluZ0J1dHRvbkN0cmwudXBkYXRlU3RhdGUoJ2Vycm9yJyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIENsZWFyIHRoZSBsb2FkaW5nIGFuaW1hdGlvbiBhbmQgd2FpdGluZyBmbGFnLlxuICAgICAgICAgICAgaXNXYWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7bWJtUGVuZGluZ0J1dHRvbn0gZnJvbSAnLi9wZW5kaW5nLWJ1dHRvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHttYm1QZW5kaW5nQnV0dG9uVGV4dH0gZnJvbSAnLi9wZW5kaW5nLWJ1dHRvbi10ZXh0LmRpcmVjdGl2ZSc7XG5cblxuKGZ1bmN0aW9uICgpIHtcbiAgYW5ndWxhci5tb2R1bGUoJ21ibS5wZW5kaW5nQnV0dG9uJywgW10pXG4gICAgLmRpcmVjdGl2ZSgnbWJtUGVuZGluZ0J1dHRvbicsIG1ibVBlbmRpbmdCdXR0b24pXG4gICAgLmRpcmVjdGl2ZSgnbWJtUGVuZGluZ0J1dHRvblRleHQnLCBtYm1QZW5kaW5nQnV0dG9uVGV4dCk7XG59KSgpO1xuIl19
