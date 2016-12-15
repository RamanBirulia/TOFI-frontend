(function(){
    angular.module('tofi.users')
        .controller('userEditCtrl', editCtrl);

    editCtrl.$inject = ['$scope', 'users', '$stateParams'];
    function editCtrl($scope, users, $stateParams){

        users.get($stateParams.id)
            .then(function(data){
                debugger;
                $scope.entity = data;
            })

        function submit(){
            console.info('%cSUBMIT', 'color:blue; font-size: 15px');

            users.update()
        }
    }

})();