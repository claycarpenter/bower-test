import {mbmPendingButton} from './pending-button.directive';
import {mbmPendingButtonText} from './pending-button-text.directive';


(function () {
  angular.module('mbm.pendingButton', [])
    .directive('mbmPendingButton', mbmPendingButton)
    .directive('mbmPendingButtonText', mbmPendingButtonText);
})();
