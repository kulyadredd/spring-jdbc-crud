/**
 * Server Service
 * Service that holds all possible server request
 *
 * Created by Kulinenko Roman
 */
app.factory('serverService', function ($http, $q) {

    var server = {
        restGET: '/api/users',
        restPOST: '/api/users',
        restPUT: '/api/users',
        restDELETE: '/api/users/',
    };

    return {
        getUsers: function (start, count) {
            return $http.get(server.restGET, {params: {start: start, count: count}});
        },
        createUser: function (user) {
            return $http.post(server.restPOST, user);
        },
        deleteUser: function (userId, start, count) {
            return $http.delete(server.restDELETE + userId, {params: {start: start, count: count}});
        },
        updateUser: function (user) {
            return $http.put(server.restPUT, user);
        }
    }
});