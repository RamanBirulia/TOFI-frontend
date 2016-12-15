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
                .then(function(data){
                    currentUser.login(data)
                        .then(function(data){
                            $state.go('home');
                        }, function(error){
                            $state.go('login');
                        })
                }, function(error){
                    console.error('register failed!');
                })
        }
    }

})();