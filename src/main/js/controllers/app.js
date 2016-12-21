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
        $scope.newClosedDeals = 0;


        currentUser.getCurrentUser()
            .then(function(data){
                $scope.currentUser = data;
            }, function(error){
                debugger;
            });

        trader.getCurrentTraderAccounts()
            .then(function(data){
                $scope.currentTrader = data;
            }, function(error){
                debugger;
            });

        $scope.timeObj = timeService.getTime();

        $interval(updateRate, $scope.timeObj.rateTime );
        $interval(updateTimeAndMoney, $scope.timeObj.dealTime );


        ctrl.logout = function(){
            LocalStorage.remove('token');
            $state.go('login');
        };

        ctrl.removeMessage = function(type, message){
           messages.remove(type, message);
        };

        ctrl.resetNewClosedDeals = function(){
            trader.resetNewClosedDeals();
            $scope.newClosedDeals = 0;
        };

        function updateRate(){
            trader.getLastRate()
                .then(function(response){
                    // debugger;
                }, function(error){
                    // debugger;
                })
        }

        function updateTimeAndMoney(){
            trader.getNewClosedDeal()
                .then(function(response){
                    $scope.newClosedDeals += response.count;
                    $scope.currentTrader[0] = response.accounts[0];
                    $scope.currentTrader[1] = response.accounts[1];
                })
        }





    }

})();