(function(){
    angular.module('tofi.statistic')
        .controller('statisticCtrl', statisticCtrl);

    statisticCtrl.$inject = ['$scope', 'trader'];
    function statisticCtrl($scope, trader){
        var ctrl = this;
        ctrl.refresh = function(){
            debugger;
            trader.getDeals()
                .then(function (response) {
                    $scope.deals = response.myDeals;
                })
        };
        ctrl.refresh();
    }

})();