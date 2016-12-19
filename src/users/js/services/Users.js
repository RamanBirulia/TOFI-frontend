(function() {
    angular
        .module('tofi.users')
        .factory('users', usersService);

    usersService.$inject = ['$http', 'LocalStorage'];
    function usersService($http, LocalStorage) {
        var usersEntity = function() {

            this.getAll = function () {
                return $http.get('/api/users?token=' + LocalStorage.retrieve('token'))
                    .then(function(response){
                        return response.data.results;
                    })
            }

            this.get = function(id){
                return $http.get('/api/users/' + id + '?token=' + LocalStorage.retrieve('token'))
                    .then(_decorateEntity, onError);
            }

            this.update = function(entity){
                return $http.put('/api/users/' + entity._id + '?token=' + LocalStorage.retrieve('token'), entity)
                   .then(_decorateEntity, onError);
            }

            this.create = function(entity){
                return $http.post('/api/register/', entity)
                    .then(_decorateEntity, onError);
            }

            this.remove = function(id){
                return $http.delete('/api/users/'+id+'?token=' + LocalStorage.retrieve('token'))
                    .then(_decorateEntity, onError);
                }
        }

        usersEntity.prototype = new usersEntity();
        return new usersEntity();



        function _decorateEntity(user){
            user.data.toString = function (){
                if (this.name || this.surname){
                    return  (this.name || ' ') + ' ' + (this.surname || ' ');
                } else {
                    return this.login;
                }
            }
            return user.data;
        }

        function onError(error){
            throw error;
        }
    }
})();

