/**
 * Controller that handles add new user action
 *
 * Created by Kulinenko Roman
 */
app.controller('addUserController', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close($scope.user);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});