(function(){
    angular
        .module('tofi')
        .controller('AppCtrl', appCtrl);

    appCtrl.$inject = ['$scope', 'isAuth', '$state', 'currentUser', 'LocalStorage', 'messages', 'trader', 'timeService', '$interval'];
    function appCtrl($scope, isAuth, $state, currentUser, LocalStorage, messages, trader, timeService, $interval){
        var ctrl = this;
        if (!isAuth){
            $state.go('login');
        }

        $scope.messages = messages.getAllMessageInfo();

        trader.getRates()
            .then(function(data){
                $scope.rate = data;
                timeService.getTime()
                    .then(function(response){
                        $scope.timeObj =response;
                        trader.startUpdateRate();
                        trader.startUpdateDeals();
                    });
            });

        trader.getDeals()
            .then(function(data){
                $scope.deals = data;
            });

        currentUser.getCurrentUser()
            .then(function(data){
                $scope.currentUser = data;
            });

        trader.getCurrentTraderAccounts()
            .then(function(data){
                $scope.accounts = data;
            });

        ctrl.logout = function(){
            LocalStorage.remove('token');
            $state.go('login');
        };

        ctrl.removeMessage = function(type, message){
           messages.remove(type, message);
        };

        ctrl.resetNewClosedDeals = function(){
            trader.resetNewDeals();
        };

        $scope.$on('$destroy', function() {
            trader.stopUpdate();
        })
    }

})();