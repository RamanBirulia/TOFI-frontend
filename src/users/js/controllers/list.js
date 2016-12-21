(function(){
    angular.module('tofi.users')
        .controller('userListCtrl', listCtrl);

    listCtrl.$inject = ['users', '$scope', 'allUsers', 'messages', '$state'];
    function listCtrl(users, $scope, allUsers, messages, $state){
        var ctrl = this;

        $scope.users = allUsers;

        ctrl.deleteUser = function(id){
            users.remove(id)
                .then(function(data){
                    messages.success('User deleted successfully');
                    $state.reload();
                }, function(error){
                    messages.danger('User deleted unsuccessfully', error);
                })
        }

    }

})();