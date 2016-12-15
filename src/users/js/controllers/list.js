(function(){
    angular.module('tofi.users')
        .controller('userListCtrl', listCtrl);

    listCtrl.$inject = ['users', '$scope'];
    function listCtrl(users, $scope){
        console.log('%cUser List ctrl', 'color: blue; font-size: 17px');

        users.getAll()
            .then(function(data){
                $scope.users = data;
            })
    }

})();