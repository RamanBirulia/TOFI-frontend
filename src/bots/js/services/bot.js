(function() {
    angular
        .module('tofi.bots')
        .factory('bots', botsService);

    botsService.$inject = ['$http', 'LocalStorage'];
    function botsService($http, LocalStorage) {

        var botsEntity = function() {

            this.getAll = function () {
                return $http.get('/api/bots?token=' + LocalStorage.retrieve('token'))
                    .then(function(response){
                        return response.data.results;
                    })
            };

            this.create = function(entity){
                return $http.post('/api/bots?token=' + LocalStorage.retrieve('token'), entity)
                    .then(function(response){
                        debugger;
                        return response;
                    })
            };

            this.get = function(id){
                return $http.get('/api/bots/' + id + '?token=' + LocalStorage.retrieve('token'))
                    .then(function(response){
                        debugger;
                        return response;
                    })
            };

            // this.remove = function(id){
            //     return $http.delete()
            //         .then(function(response){
            //             debugger;
            //             return response;
            //         })
            // }
        };

        botsEntity.prototype = new botsEntity();
        return new botsEntity();
    }
})();

