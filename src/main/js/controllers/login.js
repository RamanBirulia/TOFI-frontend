(function(){
    angular.module('tofi')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$state'];
    function loginCtrl($scope, $state){
        $scope.submit = function(){
            if ($scope.username === 'admin' && $scope.password === 'admin'){
                $state.go('home');
            } else {
                console.error('GO HOME!');
            }
        }
    }

})();