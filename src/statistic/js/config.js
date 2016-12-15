(function(){
    angular.module('tofi.statistic', [])

    angular
        .module('tofi.statistic')
        .config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('statistic', {
                url: "/statistic",
                controller: 'statisticCtrl',
                controllerAs: 'ctrl',
                templateUrl: "src/statistic/templates/statistic.html"
            })
    }
})();