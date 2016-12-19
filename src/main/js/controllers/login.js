(function(){
    angular.module('tofi')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$state', 'currentUser', 'LocalStorage', 'messages'];
    function loginCtrl($scope, $state, currentUser, LocalStorage, messages){
        var vm = this;

        vm.submit = function(){
            currentUser.login($scope.entity)
                .then(function(response){
                    LocalStorage.store('token', response.data.token);
                    $state.go('app.home');
                }, function(error){
                    messages.danger('Login failed', error.data);
                })


        }
    }

})();