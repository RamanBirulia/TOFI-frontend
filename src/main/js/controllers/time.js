(function(){

    angular.module('tofi')
        .controller('timeCtrl', timeCtrl);

    timeCtrl.$inject = ['timeService', '$scope', 'trader'];
    function timeCtrl(timeService, $scope, trader){

        var vm = this;

        timeService.getTime()
            .then(function(response){
                $scope.time = response;
            });

        // restartUpdateDeal:restartUpdateDeal,
        // restartUpdateRate: restartUpdateRate,

        vm.upRate = function(){
            timeService.upRate()
                .then(function(data){
                    debugger;
                    trader.restartUpdateRate(data);
                })
        };

        vm.downRate = function(){
            timeService.downRate()
                .then(function(data){
                    trader.restartUpdateRate(data);
                })
        };

        vm.upDeal = function(){
            timeService.upDeal()
                .then(function(data){
                    trader.restartUpdateDeal(data);
                })
        };

        vm.downDeal = function(){
            timeService.downDeal()
                .then(function(data){
                    trader.restartUpdateDeal(data);
                })
        }
    }

})();