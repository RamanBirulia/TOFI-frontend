(function(){
    angular.module('tofi.users')
        .controller('userListCtrl', listCtrl);

    listCtrl.$inject = ['users', '$scope', 'allUsers', 'messages'];
    function listCtrl(users, $scope, allUsers, messages){
        var ctrl = this;

        $scope.users = allUsers;

        ctrl.deleteUser = function(id){
            users.remove(id)
                .then(function(data){
                    messages.success('User deleted successfully');
                }, function(error){
                    messages.danger('User deleted successfully', error);
                })
        }

    }

})();