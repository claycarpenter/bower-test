import {mbmPendingButton} from './pendingButton.directive';
import {mbmPendingButtonText} from './pendingButtonText.directive';


(function () {
  angular.module('mbm.pendingButton', [])
    .directive('mbmPendingButton', mbmPendingButton)
    .directive('mbmPendingButtonText', mbmPendingButtonText);
})();
