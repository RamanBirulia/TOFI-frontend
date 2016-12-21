(function() {
    angular
        .module('tofi.bots')
        .factory('bots', botsService);

    botsService.$inject = ['$http', 'LocalStorage'];
    function botsService($http, LocalStorage) {

        var botsEntity = function() {

            this.getAll = function () {
                return $http.get();
            }

            this.create = function(entity){
                return $http.post();
            }

            this.remove = function(id){
                return $http.delete();
            }
        }

        usersEntity.prototype = new usersEntity();
        return new usersEntity();
    }
})();

