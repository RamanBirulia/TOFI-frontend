(function(){
    angular.module('tofi')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$state', 'currentUser', 'LocalStorage', 'messages'];
    function loginCtrl($scope, $state, currentUser, LocalStorage, messages){
        var vm = this;

        vm.submit = function(){

            currentUser.login($scope.entity)
                .then(function(response){
                    $state.go('app.home');
                });
        }
    }

})();