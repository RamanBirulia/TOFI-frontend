(function(){
    angular
        .module('tofi')
        .controller('AppCtrl', appCtrl);

    appCtrl.$inject = ['$scope', 'isAuth', '$state', 'currentUser', 'LocalStorage', 'messages', 'trader', 'timeService'];
    function appCtrl($scope, isAuth, $state, currentUser, LocalStorage, messages, trader, timeService){
        var ctrl = this;
        if (!isAuth){
            $state.go('login');
        }

        ctrl.logout = function(){
            LocalStorage.remove('token');
            $state.go('login');
        }

        currentUser.getCurrentUser()
            .then(function(data){
                $scope.currentUser = data;
                trader.getInfo();
            }, function(error){
                debugger;
            })

        ctrl.removeMessage = function(type, message){
           messages.remove(type, message);
        }

        $scope.messages = messages.getAllMessageInfo();
    }

})();