(function() {
    angular
        .module('tofi.users')
        .factory('users', usersService);

    usersService.$inject = [];
    function usersService() {

        var usersEntity = function() {
            this.getAll = function () {
                //get simplify information for all users
            }

            this.get = function(id){
                //get detail information about current user
            }
        };

        usersEntity.prototype = new usersEntity();
        return new usersEntity();
    }
})();

