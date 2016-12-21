(function(){
    angular.module('tofi.statistic')
        .controller('statisticCtrl', statisticCtrl);

    statisticCtrl.$inject = ['$scope', 'trader', 'timeService', '$interval'];
    function statisticCtrl($scope, trader, timeService, $interval){

        $scope.timeObj = timeService.getTime();
        $interval(updateRates, $scope.timeObj.dealTime);
        function updateRates() {
            trader.getDeals()
                .then(function (response) {
                    debugger;
                    $scope.deals = response.results ;
                }, function (erros) {
                    debugger;
                })
        }
    }

})();