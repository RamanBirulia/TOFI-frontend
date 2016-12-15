(function() {
    angular
        .module('tofi.users')
        .factory('users', usersService);

    usersService.$inject = ['$http'];
    function usersService($http) {
        var usersEntity = function() {

            this.getAll = function () {
                return $http.get('/api/users');
            }

            this.get = function(id){
                return $http.get('/api/users/' + id)
                    .then(_decorateEntity, null);
            }

            this.update = function(entity){
                return $http.put('/api/users/' + entity.id, entity)
                   .then(_decorateEntity, null);
            }

            this.create = function(entity){
                return $http.post('/api/users/', entity)
                    .then(_decorateEntity, null);
            }

            this.remove = function(id){
                return $http.delete('/api/users/'+id)
                    .then(_decorateEntity, null);
                }
        }

        usersEntity.prototype = new usersEntity();
        return new usersEntity();

        function _decorateEntity(user){
            user.toString = function (){
                return this.firstname + ' ' + this.secondname;
            }
            return user;
        }
    }
})();

