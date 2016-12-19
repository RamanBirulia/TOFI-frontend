(function(){
    angular.module('tofi.trade', [])

    angular
        .module('tofi.trade')
        .config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app.trade', {
                url: "/trade",
                controller: 'tradeCtrl',
                controllerAs: 'ctrl',
                templateUrl: "src/trade/templates/trade.html"
            })
    }
})();