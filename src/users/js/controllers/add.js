(function(){
    angular.module('tofi.users')
        .controller('userAddCtrl', addCtrl);

    addCtrl.$inject = ['$scope', '$http', 'users', 'messages', '$state'];
    function addCtrl($scope, $http, users, messages, $state){
        var ctrl = this;

        $scope.entity = {};
        $scope.submitted = false;

        ctrl.submit = function(formValid){

            if(formValid){
                users.create($scope.entity)
                    .then(function(data){
                        messages.success('User ' + data.toString() + ' created successfully.')
                        $state.go('app.users.list');
                    }, function(response){
                        messages.danger('Fail to create user.', response.data.errors);
                    })
            } else {
                $scope.submitted = true;
            }

        }
    }

})();