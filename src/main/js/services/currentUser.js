(function() {
    angular
        .module('tofi')
        .factory('currentUser', currentUserService);

    currentUserService.$inject = ['$http', '$q', 'LocalStorage'];
    function currentUserService($http, $q, LocalStorage) {

        var currentUser = null;

        var currentUserEntity = function() {

            this.info = currentUser;

            this.register = function(obj){
                return $http.post('/api/register', obj);
            }

            this.login = function(obj){
                return $http.post('/api/authenticate', obj);
            }

            this.updateInfo = function(){
                return update();
            }

            this.getCurrentUser = function(){
                if (currentUser) {
                    return $q.when(currentUser);
                } else {
                    return update();
                }
            }

            function update(){
                return $http.get('/api/users/me?token=' + LocalStorage.retrieve('token'))
                    .then(function(response){
                        currentUser = response.data;
                        currentUser.toString = function(){
                            return (this.name || ' ') + ' ' + (this.surname || ' ');
                        }
                        return response.data;
                    })
            }
        };

        currentUserEntity.prototype = new currentUserEntity();
        return new currentUserEntity();
    }
})();

