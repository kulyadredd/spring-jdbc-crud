/**
 * This file contains main logic in modal window
 *
 * Created by Kulinenko Roman
 */
app.factory('modalService', function ($q, serverService, $uibModal) {
    return {
        show: function (animationsEnabled) {
            var deferred = $q.defer();
            var modalInstance = $uibModal.open({
                animation: animationsEnabled,
                templateUrl: 'template/AddUserModalContent.html',
                controller: 'addUserController'
            });
            modalInstance.result.then(function (user) {
                serverService.createUser(user).then(function (answer) {
                    if (answer.status == 201) {
                        deferred.resolve();
                    }
                });
            });
            return deferred.promise;
        }
    }
});