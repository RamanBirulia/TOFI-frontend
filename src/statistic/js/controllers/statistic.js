(function(){
    angular.module('tofi.statistic')
        .controller('statisticCtrl', statisticCtrl);

    statisticCtrl.$inject = ['$scope', 'trader', 'messages'];
    function statisticCtrl($scope, trader, messages){
        var ctrl = this;

        trader.getDeals()
            .then(function (response) {
                $scope.deals = response.results;
            });

        ctrl.refresh = function(){
            trader.getDeals()
                .then(function (response) {
                    messages.success('Statistic refresh sucessfully');
                    debugger;






                    $scope.deals = response.results;
                }, function (errors) {
                    messages.danger('Failed to refresh statistic', errors);
                })
        };
    }

})();