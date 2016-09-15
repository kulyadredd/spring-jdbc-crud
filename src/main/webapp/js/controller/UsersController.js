/**
 * Controller that handles all user action
 *
 * Created by Kulinenko Roman
 */
app.controller("usersController", function ($scope, serverService, modalService, userService) {

    $scope.itemPerPage = 5;
    $scope.zeroCount = 0;
    $scope.defaultPage = 1;
    $scope.showPage = 5;
    $scope.currentPage = $scope.defaultPage;
    $scope.pagesCount = 0;
    $scope.disableFirstAndPrevBtn = true;
    $scope.disableLastAndNextBtn = true;
    $scope.pages = [];

    $scope.headingTitle = "JDBC simple CRUD";
    $scope.animationsEnabled = true;
    $scope.editable = false;
    $scope.users = [];

    loadUsers($scope.zeroCount);

    $scope.updateUser = function (user) {
        serverService.updateUser(user).then(function () {
            loadUsers(userService.getStartCount($scope.currentPage, $scope.itemPerPage));
        });
    };

    $scope.deleteUser = function (id) {
        serverService.deleteUser(id).then(function () {
            loadUsers(userService.getStartCount($scope.currentPage, $scope.itemPerPage));
        })
    };

    $scope.openModalAddNewUser = function () {
        modalService.show($scope.animationsEnabled).then(function (data) {
            $scope.currentPage = 1;
            loadUsers($scope.zeroCount);
        });
    };

    $scope.firstPage = function () {
        $scope.currentPage = 1;
        loadUsers($scope.zeroCount);
    };

    $scope.nextPage = function () {
        var start = $scope.currentPage * $scope.itemPerPage;
        $scope.currentPage++;
        loadUsers(start);
    };

    $scope.goToPage = function (page) {
        $scope.currentPage = page;
        loadUsers(userService.getStartCount($scope.currentPage, $scope.itemPerPage));
    };

    $scope.lastPage = function () {
        $scope.currentPage = $scope.pagesCount;
        var start = ($scope.pagesCount * $scope.itemPerPage) - $scope.itemPerPage;
        loadUsers(start);
    };

    $scope.prevPage = function () {
        $scope.currentPage--;
        loadUsers(userService.getStartCount($scope.currentPage, $scope.itemPerPage));
    };

    function loadUsers(start) {
        serverService.getUsers(start, $scope.itemPerPage).then(function (answer) {
            controlUsers(answer.data);
        });
    }

    function controlUsers(data) {
        $scope.users = data;
        $scope.pagesCount = Math.ceil($scope.users.count / $scope.itemPerPage);
        btnControls();
        $scope.pages = userService.pageControls($scope.defaultPage, $scope.showPage,
            $scope.currentPage, $scope.pagesCount);
    }

    function btnControls() {
        if ($scope.pagesCount < $scope.defaultPage || $scope.currentPage == $scope.pagesCount)
            $scope.disableLastAndNextBtn = true;
        else
            $scope.disableLastAndNextBtn = false;

        if ($scope.currentPage > $scope.defaultPage)
            $scope.disableFirstAndPrevBtn = false;
        else
            $scope.disableFirstAndPrevBtn = true;
    }

});