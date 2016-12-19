(function(){
    angular.module('tofi.users')
        .controller('userEditCtrl', editCtrl);

    editCtrl.$inject = ['$scope', 'users', '$stateParams', 'entity', 'messages', '$state'];
    function editCtrl($scope, users, $stateParams, entity, messages, $state){
        var ctrl = this;

        $scope.submitted = false;
        $scope.entity = entity;

        function submit(){
            console.info('%cSUBMIT', 'color:blue; font-size: 15px');

            users.update()
        }

        ctrl.submit = function(formValid){
            if(formValid){
                users.update($scope.entity)
                    .then(function(data){
                        messages.success('User ' + data.toString() + ' update successfully.')
                        $state.go('app.users.list');
                    }, function(response){
                        messages.danger('Fail to update user.', response.data.errors);
                    })
            } else {
                $scope.submitted = true;
            }

        }
    }

})();