(function() {
    angular
        .module('tofi')
        .factory('currentUser', currentUserService);

    currentUserService.$inject = ['$http'];
    function currentUserService($http) {

        var currentUserEntity = function() {

            this.register = function(obj){
                return $http.post('/api/register', obj);
            }

            this.login = function(obj){
                return $http.post('/api/authenticate', obj);
            }
        };

        currentUserEntity.prototype = new currentUserEntity();
        return new currentUserEntity();
    }
})();

