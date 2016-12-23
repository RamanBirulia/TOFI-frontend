(function(){
    angular.module('tofi.statistic')
        .controller('statisticCtrl', statisticCtrl);

    statisticCtrl.$inject = ['$scope', 'trader', 'messages'];
    function statisticCtrl($scope, trader, messages){
        var ctrl = this;
        ctrl.refresh = function(bool){
            trader.getDeals()
                .then(function (response) {
                    $scope.deals = response.myDeals;
                    if (!bool){
                        messages.success('Statistic refresh successfully');
                    }
                })
        };
        ctrl.refresh(true);
    }

})();