(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.siPendingButton = siPendingButton;
// angular
//   .module('mbm.pendingButton')
//   .directive('siPendingButton', ['$rootScope', siPendingButton]);

function siPendingButton($rootScope) {
  return {
    restrict: 'A',
    require: 'siPendingButton',
    scope: {
      isExternalEnabled: '=?siPendingButtonEnabled',
      actionReceiver: '&siPendingButton'
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

},{}],2:[function(require,module,exports){
'use strict';

var _pendingButton = require('./pendingButton.directive');

var _pendingButton2 = _interopRequireDefault(_pendingButton);

var _pendingButtonText = require('./pendingButtonText.directive');

var _pendingButtonText2 = _interopRequireDefault(_pendingButtonText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  angular.module('mbm.pendingButton', []);
})();

},{"./pendingButton.directive":1,"./pendingButtonText.directive":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.siPendingButtonText = siPendingButtonText;
// angular
//   .module('mbm.pendingButton')
//   .directive('siPendingButtonText', ['$rootScope', siPendingButtonText]);

function siPendingButtonText($rootScope) {
  return {
    restrict: 'EA',
    require: '^siPendingButton',
    scope: {
      statusCategory: '@siPendingButtonText'
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvcGVuZGluZ0J1dHRvbi5kaXJlY3RpdmUuanMiLCJzcmMvcGVuZGluZ0J1dHRvbi5tb2R1bGUuanMiLCJzcmMvcGVuZGluZ0J1dHRvblRleHQuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7UUNJZ0IsZSxHQUFBLGU7Ozs7O0FBQVQsU0FBUyxlQUFULENBQXlCLFVBQXpCLEVBQXFDO0FBQzFDLFNBQU87QUFDTCxjQUFVLEdBREw7QUFFTCxhQUFTLGlCQUZKO0FBR0wsV0FBTztBQUNMLHlCQUFtQiwwQkFEZDtBQUVMLHNCQUFnQjtBQUZYLEtBSEY7QUFPTCxnQkFBWSxDQUFDLFFBQUQsRUFBVyxVQUFTLE1BQVQsRUFBaUI7QUFDdEMsVUFBSSxLQUFLLElBQVQ7VUFDSSxrQkFBa0IsRUFEdEI7VUFFSSxlQUFlLE1BRm5COztBQUlBLFNBQUcsWUFBSCxHQUFrQixTQUFTLFlBQVQsQ0FBc0IseUJBQXRCLEVBQWlEO0FBQ2pFLHdCQUFnQixJQUFoQixDQUFxQix5QkFBckI7QUFDRCxPQUZEOztBQUlBLFNBQUcsV0FBSCxHQUFpQixTQUFTLFdBQVQsQ0FBcUIsUUFBckIsRUFBK0I7QUFDOUMsdUJBQWUsUUFBZjs7QUFFQSwwQkFBa0IsWUFBbEI7QUFDRCxPQUpEOztBQU1BLFNBQUcsUUFBSCxHQUFjLFNBQVMsUUFBVCxHQUFvQjtBQUNoQyxlQUFPLFlBQVA7QUFDRCxPQUZEOztBQUlBLGVBQVMsaUJBQVQsQ0FBMkIsUUFBM0IsRUFBcUM7QUFDbkMsd0JBQWdCLE9BQWhCLENBQXdCLFVBQVMseUJBQVQsRUFBb0M7QUFDMUQsb0NBQTBCLFFBQTFCO0FBQ0QsU0FGRDtBQUdEO0FBQ0YsS0F4QlcsQ0FQUDtBQWdDTCxVQUFNLGNBQVUsTUFBVixFQUFrQixPQUFsQixFQUEyQixJQUEzQixFQUFpQyxpQkFBakMsRUFBb0Q7QUFDeEQsVUFBSSxZQUFZLEtBQWhCOzs7QUFHQSxVQUFJLENBQUMsUUFBUSxJQUFSLENBQWEsd0JBQWIsRUFBdUMsTUFBNUMsRUFBb0Q7QUFDbEQsZ0JBQVEsTUFBUixDQUFlLHVDQUFmO0FBQ0Q7O0FBRUQsVUFBSSxPQUFPLE9BQU8saUJBQWQsS0FBb0MsV0FBeEMsRUFBcUQ7OztBQUduRCxlQUFPLGlCQUFQLEdBQTJCLElBQTNCO0FBQ0Q7O0FBRUQsYUFBTyxTQUFQLEdBQW1CLFNBQVMsU0FBVCxHQUFxQjtBQUN0QyxlQUFPLE9BQU8saUJBQVAsSUFBNEIsQ0FBQyxTQUFwQztBQUNELE9BRkQ7O0FBSUEsYUFBTyxNQUFQLENBQWMsYUFBZCxFQUE2QixVQUFTLEtBQVQsRUFBZ0I7QUFDM0MsZ0JBQVEsV0FBUixDQUFvQixVQUFwQixFQUFnQyxDQUFDLEtBQWpDO0FBQ0QsT0FGRDs7QUFJQSxjQUFRLEVBQVIsQ0FBVyxrQkFBWCxFQUErQixVQUFTLEtBQVQsRUFBZ0I7QUFDN0MsWUFBSSxLQUFKLEVBQVc7QUFBRSxnQkFBTSxjQUFOO0FBQXlCOzs7QUFHdEMsWUFBSSxDQUFDLE9BQU8sU0FBUCxFQUFMLEVBQXlCO0FBQUU7QUFBUzs7O0FBR3BDLFlBQUksVUFBVSxPQUFPLGNBQVAsRUFBZDs7O0FBR0EsZ0JBQVEsUUFBUixDQUFpQixTQUFqQjs7O0FBR0Esb0JBQVksSUFBWjtBQUNBLGVBQU8sTUFBUDs7QUFFQSwwQkFBa0IsV0FBbEIsQ0FBOEIsTUFBOUI7O0FBRUEsZ0JBQ0csSUFESCxDQUNRLFlBQVc7QUFDZiw0QkFBa0IsV0FBbEIsQ0FBOEIsU0FBOUI7QUFDRCxTQUhILEVBSUcsS0FKSCxDQUlTLFlBQVc7QUFDaEIsNEJBQWtCLFdBQWxCLENBQThCLE9BQTlCO0FBQ0QsU0FOSCxFQU9HLE9BUEgsQ0FPVyxZQUFXOztBQUVsQixzQkFBWSxLQUFaO0FBQ0Esa0JBQVEsV0FBUixDQUFvQixTQUFwQjtBQUNELFNBWEg7QUFZRCxPQTlCRDtBQStCRDtBQXJGSSxHQUFQO0FBdUZEOzs7OztBQzVGRDs7OztBQUNBOzs7Ozs7QUFHQSxDQUFDLFlBQVk7QUFDWCxVQUFRLE1BQVIsQ0FBZSxtQkFBZixFQUFvQyxFQUFwQztBQUNELENBRkQ7Ozs7Ozs7O1FDQWdCLG1CLEdBQUEsbUI7Ozs7O0FBQVQsU0FBUyxtQkFBVCxDQUE2QixVQUE3QixFQUF5QztBQUM5QyxTQUFPO0FBQ0wsY0FBVSxJQURMO0FBRUwsYUFBUyxrQkFGSjtBQUdMLFdBQU87QUFDTCxzQkFBZ0I7QUFEWCxLQUhGO0FBTUwsVUFBTSxjQUFVLE1BQVYsRUFBa0IsT0FBbEIsRUFBMkIsSUFBM0IsRUFBaUMsaUJBQWpDLEVBQW9EO0FBQ3hELHdCQUFrQixZQUFsQixDQUErQixjQUEvQjs7QUFFQSxVQUFJLFNBQVMsT0FBTyxjQUFQLENBQXNCLEtBQXRCLENBQTRCLEdBQTVCLEVBQWlDLEdBQWpDLENBQXFDLFVBQVMsS0FBVCxFQUFnQjtBQUFFLGVBQU8sTUFBTSxJQUFOLEVBQVA7QUFBc0IsT0FBN0UsQ0FBYjs7QUFFQSxlQUFTLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUM7QUFDakMsWUFBSSxPQUFPLE9BQVAsQ0FBZSxTQUFmLEtBQTZCLENBQWpDLEVBQW9DO0FBQ2xDLGtCQUFRLElBQVI7QUFDRCxTQUZELE1BRU87QUFDTCxrQkFBUSxJQUFSO0FBQ0Q7QUFDRjs7QUFFRCxxQkFBZSxrQkFBa0IsUUFBbEIsRUFBZjtBQUNEO0FBcEJJLEdBQVA7QUFzQkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiICAvLyBhbmd1bGFyXG4gIC8vICAgLm1vZHVsZSgnbWJtLnBlbmRpbmdCdXR0b24nKVxuICAvLyAgIC5kaXJlY3RpdmUoJ3NpUGVuZGluZ0J1dHRvbicsIFsnJHJvb3RTY29wZScsIHNpUGVuZGluZ0J1dHRvbl0pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2lQZW5kaW5nQnV0dG9uKCRyb290U2NvcGUpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHJlcXVpcmU6ICdzaVBlbmRpbmdCdXR0b24nLFxuICAgIHNjb3BlOiB7XG4gICAgICBpc0V4dGVybmFsRW5hYmxlZDogJz0/c2lQZW5kaW5nQnV0dG9uRW5hYmxlZCcsXG4gICAgICBhY3Rpb25SZWNlaXZlcjogJyZzaVBlbmRpbmdCdXR0b24nXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgdmFyIHZtID0gdGhpcyxcbiAgICAgICAgICByZWdpc3RlcmVkVGV4dHMgPSBbXSxcbiAgICAgICAgICBjdXJyZW50U3RhdGUgPSAnaW5pdCc7XG5cbiAgICAgIHZtLnJlZ2lzdGVyVGV4dCA9IGZ1bmN0aW9uIHJlZ2lzdGVyVGV4dChwZW5kaW5nQnV0dG9uVGV4dExpc3RlbmVyKSB7XG4gICAgICAgIHJlZ2lzdGVyZWRUZXh0cy5wdXNoKHBlbmRpbmdCdXR0b25UZXh0TGlzdGVuZXIpO1xuICAgICAgfTtcblxuICAgICAgdm0udXBkYXRlU3RhdGUgPSBmdW5jdGlvbiB1cGRhdGVTdGF0ZShuZXdTdGF0ZSkge1xuICAgICAgICBjdXJyZW50U3RhdGUgPSBuZXdTdGF0ZTtcblxuICAgICAgICBub3RpZnlTdGF0ZUNoYW5nZShjdXJyZW50U3RhdGUpO1xuICAgICAgfTtcblxuICAgICAgdm0uZ2V0U3RhdGUgPSBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgICAgIH07XG5cbiAgICAgIGZ1bmN0aW9uIG5vdGlmeVN0YXRlQ2hhbmdlKG5ld1N0YXRlKSB7XG4gICAgICAgIHJlZ2lzdGVyZWRUZXh0cy5mb3JFYWNoKGZ1bmN0aW9uKHBlbmRpbmdCdXR0b25UZXh0TGlzdGVuZXIpIHtcbiAgICAgICAgICBwZW5kaW5nQnV0dG9uVGV4dExpc3RlbmVyKG5ld1N0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfV0sXG4gICAgbGluazogZnVuY3Rpb24gKCRzY29wZSwgZWxlbWVudCwgYXR0ciwgcGVuZGluZ0J1dHRvbkN0cmwpIHtcbiAgICAgIHZhciBpc1dhaXRpbmcgPSBmYWxzZTtcblxuICAgICAgLy8gSWYgbm8gcHJvZ3Jlc3MgaWNvbiBpcyBwcmVzZW50LCBhZGQgb25lLlxuICAgICAgaWYgKCFlbGVtZW50LmZpbmQoJy5idXR0b24tLXByb2dyZXNzLWljb24nKS5sZW5ndGgpIHtcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoJzxpIGNsYXNzPVwiYnV0dG9uLS1wcm9ncmVzcy1pY29uXCI+PC9pPicpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mICRzY29wZS5pc0V4dGVybmFsRW5hYmxlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gTm8gdmFsdWUgcHJvdmlkZWQgZm9yIGV4dGVybmFsIGJ1dHRvbiBlbmFibGVkIGF0dHJpYnV0ZTsgYXNzdW1lXG4gICAgICAgIC8vIGJ1dHRvbiBpcyBhbHdheXMgY29uc2lkZXJlZCBleHRlcm5hbGx5IGVuYWJsZWQuXG4gICAgICAgICRzY29wZS5pc0V4dGVybmFsRW5hYmxlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgICRzY29wZS5pc0VuYWJsZWQgPSBmdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAkc2NvcGUuaXNFeHRlcm5hbEVuYWJsZWQgJiYgIWlzV2FpdGluZztcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLiR3YXRjaCgnaXNFbmFibGVkKCknLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBlbGVtZW50LnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsICF2YWx1ZSk7XG4gICAgICB9KTtcblxuICAgICAgZWxlbWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudCkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9XG5cbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiB0aGUgYnV0dG9uIGlzbid0IGVuYWJsZWQuXG4gICAgICAgIGlmICghJHNjb3BlLmlzRW5hYmxlZCgpKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8vIEV4ZWN1dGUgdGhlIGFjdGlvbiwgYW5kIGNhcHR1cmUgdGhlIChleHBlY3RlZCkgcmV0dXJuZWQgcHJvbWlzZS5cbiAgICAgICAgdmFyIGFjdGlvblEgPSAkc2NvcGUuYWN0aW9uUmVjZWl2ZXIoKTtcblxuICAgICAgICAvLyBBZGQgbG9hZGluZyBhbmltYXRpb24uXG4gICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcblxuICAgICAgICAvLyBTZXQgd2FpdGluZyBmbGFnLCBhbmQgYXBwbHkgc2NvcGUgdG8gdXBkYXRlIGlzRW5hYmxlZCB3YXRjaC5cbiAgICAgICAgaXNXYWl0aW5nID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgIHBlbmRpbmdCdXR0b25DdHJsLnVwZGF0ZVN0YXRlKCd3YWl0Jyk7XG5cbiAgICAgICAgYWN0aW9uUVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGVuZGluZ0J1dHRvbkN0cmwudXBkYXRlU3RhdGUoJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHBlbmRpbmdCdXR0b25DdHJsLnVwZGF0ZVN0YXRlKCdlcnJvcicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBDbGVhciB0aGUgbG9hZGluZyBhbmltYXRpb24gYW5kIHdhaXRpbmcgZmxhZy5cbiAgICAgICAgICAgIGlzV2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgc2lQZW5kaW5nQnV0dG9uIGZyb20gJy4vcGVuZGluZ0J1dHRvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHNpUGVuZGluZ0J1dHRvblRleHQgZnJvbSAnLi9wZW5kaW5nQnV0dG9uVGV4dC5kaXJlY3RpdmUnO1xuXG5cbihmdW5jdGlvbiAoKSB7XG4gIGFuZ3VsYXIubW9kdWxlKCdtYm0ucGVuZGluZ0J1dHRvbicsIFtdKTtcbn0pKCk7XG4iLCIvLyBhbmd1bGFyXG4vLyAgIC5tb2R1bGUoJ21ibS5wZW5kaW5nQnV0dG9uJylcbi8vICAgLmRpcmVjdGl2ZSgnc2lQZW5kaW5nQnV0dG9uVGV4dCcsIFsnJHJvb3RTY29wZScsIHNpUGVuZGluZ0J1dHRvblRleHRdKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNpUGVuZGluZ0J1dHRvblRleHQoJHJvb3RTY29wZSkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRUEnLFxuICAgIHJlcXVpcmU6ICdec2lQZW5kaW5nQnV0dG9uJyxcbiAgICBzY29wZToge1xuICAgICAgc3RhdHVzQ2F0ZWdvcnk6ICdAc2lQZW5kaW5nQnV0dG9uVGV4dCdcbiAgICB9LFxuICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUsIGVsZW1lbnQsIGF0dHIsIHBlbmRpbmdCdXR0b25DdHJsKSB7XG4gICAgICBwZW5kaW5nQnV0dG9uQ3RybC5yZWdpc3RlclRleHQob25DaGFuZ2VTdGF0dXMpO1xuXG4gICAgICB2YXIgc3RhdGVzID0gJHNjb3BlLnN0YXR1c0NhdGVnb3J5LnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uKHN0YXRlKSB7IHJldHVybiBzdGF0ZS50cmltKCk7IH0pO1xuXG4gICAgICBmdW5jdGlvbiBvbkNoYW5nZVN0YXR1cyhuZXdTdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXRlcy5pbmRleE9mKG5ld1N0YXR1cykgPj0gMCkge1xuICAgICAgICAgIGVsZW1lbnQuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1lbnQuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uQ2hhbmdlU3RhdHVzKHBlbmRpbmdCdXR0b25DdHJsLmdldFN0YXRlKCkpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==
