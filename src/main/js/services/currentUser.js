(function() {
    angular
        .module('tofi')
        .factory('currentUser', currentUserService);

    currentUserService.$inject = ['$http', '$q', 'LocalStorage'];
    function currentUserService($http, $q, LocalStorage) {

        var currentUser = null;

        var currentUserEntity = function() {

            this.register = function(obj){
                return $http.post('/api/register', obj);
            };

            this.login = function(obj){
                return $http.post('/api/authenticate', obj)
                    .then(function(response){
                        LocalStorage.store('token', response.data.token);
                        return response;
                    })
            };

            this.getCurrentUser = function(){
                return $http.get('/api/users/me?token=' + LocalStorage.retrieve('token'))
                    .then(function(response){
                        currentUser = response.data;
                        currentUser.toString = function(){
                            return (this.name || ' ') + ' ' + (this.surname || ' ');
                        };
                        return response.data;
                    })
            };
        };

        currentUserEntity.prototype = new currentUserEntity();
        return new currentUserEntity();
    }
})();

