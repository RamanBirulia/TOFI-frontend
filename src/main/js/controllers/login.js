(function(){
    angular.module('tofi')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$state', 'currentUser', 'LocalStorage', 'messages', '$interval'];
    function loginCtrl($scope, $state, currentUser, LocalStorage, messages, $interval){
        var vm = this;

        vm.submit = function(){

            currentUser.login($scope.entity)
                .then(function(response){
                    $state.go('app.home');
                }, function(data) {
                    debugger;
                    $scope.loginFailed = true;
                    $interval(function(){
                        $scope.loginFailed = false;
                    }, 3000)
                });
        };

        $scope.loginFailed = false;
    }

})();