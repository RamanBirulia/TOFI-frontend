(function(){
    angular
        .module('tofi')
        .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$scope', '$state', 'currentUser'];
    function registerCtrl($scope, $state, currentUser){

        $scope.entity = {
            admin: false
        };

        $scope.submit = function(){
            currentUser.register($scope.entity)
                .then(function(response){
                    currentUser.login(response.data)
                        .then(function(data){
                            $state.go('app.home');
                        })
                });
        }
    }

})();