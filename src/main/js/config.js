(function(){
    angular.module('tofi')
        .config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

//        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: "/home",
                controller: 'userListCtrl',
                controllerAs: 'ctrl',
                templateUrl: "/frontend/templates/home/home.html"
            })
    }
})();